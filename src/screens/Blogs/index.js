import React, { useEffect, useState } from 'react';
import { SERVER_API_URL } from '../../server/server'
import './index.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { AiTwotoneDelete } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        blog_link: '',
        blog_url: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/api/blog/blogs`);
            setBlogs(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${SERVER_API_URL}/api/blog/delete/${id}`);
            if (res.data.success) {
                toast.success('Blog deleted successfully');
                fetchBlogs(); // refresh list
            } else {
                toast.error(res.data.message || 'Failed to delete blog');
            }
        } catch (error) {
            toast.error('Server error while deleting');
            console.error(error);
        }
    };


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('blog_url', formData.blog_url); // actual file
        data.append('description', formData.description);
        data.append('blog_link', formData.blog_link);

        try {
            const res = await axios.post(`${SERVER_API_URL}/api/blog/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                toast.success('Blog created successfully!');
                setFormData({ blog_url: '', blog_link: '', description: '' });
                fetchBlogs();
            } else {
                toast.error(res.data.message || 'Failed to create blog');
            }
        } catch (error) {
            toast.error('Server error');
            console.error(error);
        }
    };


    return (
        <>
            <Header />
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">
                    <h2>Create Blog</h2>
                    <form onSubmit={handleSubmit} className="blog-form">
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        <input
                            name="blog_link"
                            value={formData.blog_link}
                            onChange={handleChange}
                            placeholder="Blog Link (optional)"
                        />
                        <input
                            type="file"
                            name="blog_url"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, blog_url: e.target.files[0] })}
                            required
                        />

                        <button type="submit">Create Blog</button>
                    </form>

                    <h2>All Blogs</h2>
                    <div className="blog-list">
                        {blogs.length === 0 ? (
                            <p>No blogs found.</p>
                        ) : (
                            blogs.map((blog, index) => (
                                <div key={index} className="blog-item">
                                    <img src={`${SERVER_API_URL}/uploads/${blog.blog_url}`} alt="blog" width="50%" height="400px" />
                                    <p style={{ width: "400px" }}>{blog.description}</p>
                                    {blog.blog_link && (
                                        <p className='link-delete-icon'>
                                            <a href={blog.blog_link} target="_blank" rel="noopener noreferrer">Visit Blog Link</a> <AiTwotoneDelete size={18}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDelete(blog.id)}
                                            />
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default Blogs;
