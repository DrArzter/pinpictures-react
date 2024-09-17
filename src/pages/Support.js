import React from "react";


//TODO REFACTOR
function Support() {
    return (
        <div className="flex flex-col items-center mx-auto p-4">
            <div className="w-full lg:w-3/4 p-6 bg-zinc-800 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Support</h1>
            </div>
            <div className="w-full lg:w-3/4 p-6 rounded-lg bg-zinc-800 mt-4">
                <p className="mb-4">If you have any questions or concerns, please contact me.</p>
                <p className="mb-4">Email: chapegarostislav@gmail.com</p>
                <a href = "https://github.com/DrArzter" className="mb-4">GitHub</a>
            </div>
            <iframe src="https://vk.com/video_ext.php?oid=-219485364&id=456239129&hd=2&autoplay=1" width="325" height="646" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>
        </div>
    );
}

export default Support;