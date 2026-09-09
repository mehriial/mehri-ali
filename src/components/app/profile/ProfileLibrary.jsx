import ProfileBooks from "./ProfileBooks.jsx";

import { profileLibrary } from "@/data/profile.js";


function ProfileLibrary() {
    return (
        <div>
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                        Kitaplık
                    </p>
                </div>

            </div>

            <div className="mt-6">
                <ProfileBooks books={profileLibrary} />
            </div>
        </div>
    );
}

export default ProfileLibrary;