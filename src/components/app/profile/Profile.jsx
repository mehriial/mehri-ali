import ProfileHeader from "./ProfileHeader.jsx";
import ProfileLibrary from "./ProfileLibrary.jsx";

import {
    profile,
    profileLibrary,
} from "@/data/profile";


function Profile() {

    return (
        <section className="mx-auto max-w-[1100px] px-5 pb-24 pt-28 sm:px-8">
            <ProfileHeader
                profile={profile}
                libraryCount={profileLibrary.length}
            />

            <div className="mt-8">
                    <ProfileLibrary />
            </div>
        </section>
    );
}

export default Profile;