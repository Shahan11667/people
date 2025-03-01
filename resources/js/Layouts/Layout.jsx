import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            {/* Bootstrap CDN */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                integrity="sha384-rbsA2VBKQABk3MPJrHIz1q5StD4mO5I8jOe99JG9PgsNedbL59jH/8b4T9ckh7gD"
                crossOrigin="anonymous"
            />
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-kuGm9v5ls4C1FQ6XcFfEkCzvB0wJhoyB0Y/hV+bLsI2i5I9JLOFbJFc3sDujowT"
                crossOrigin="anonymous"
                defer
            ></script>

            {/* Page Content */}
            <div className="container mt-4">{children}</div>
        </>
    );
}
