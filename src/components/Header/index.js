import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
// import logo from "./logo.png"; // Replace with your actual logo path
import { SiWorldhealthorganization } from "react-icons/si";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div>
                {/* Top Bar */}
                <div className="top-bar">
                    <span>
                        <SiWorldhealthorganization size={25}/>
                        Bizz Count Solutions
                    </span>
                </div>
            </div>
        </>
    );
};

export default Header;
