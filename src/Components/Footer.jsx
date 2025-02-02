import React from "react";

const Footer = () => {
  return (
    <footer className="footer relative footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by John M.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
