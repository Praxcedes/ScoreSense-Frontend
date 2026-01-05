import { useState } from "react";
import AvatarUpload from "../components/AvatarUpload";
import { completeProfile } from "../services/authApi";

export default function CompleteProfile() {
  const [avatar, setAvatar] = useState("");

  const submitProfile = async () => {
    await completeProfile({ avatar });
    alert("Profile completed");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="font-bold mb-3">Complete Profile</h2>

      <AvatarUpload onUpload={setAvatar} />

      {avatar && <img src={avatar} className="mt-3 w-24 h-24 rounded-full" />}

      <button
        onClick={submitProfile}
        className="mt-4 bg-black text-white p-2 w-full"
      >
        Save Profile
      </button>
    </div>
  );
}
