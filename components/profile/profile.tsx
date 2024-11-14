"use client"; // Mark this as a client-side component
import { CheckCheck, Loader, Pencil, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import initialImage from "/assets/images/BIS.png";

interface ProfileProps {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    imgURL: string;
    isVerified: boolean;
    gender: string;
    imgType: string;
    addresses: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      label: string;
      phoneNumber: string;
    }[];
  };
}

const Profile = ({ user }: ProfileProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newGender, setNewGender] = useState(user.gender);
  const [newImg, setNewImg] = useState(user.imgURL || initialImage);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(user.addresses);
  const resetForm = useCallback(() => {
    setNewName(user.name);
    setNewEmail(user.email);
    setNewGender(user.gender);
    setIsEditingInfo(false);
  }, [user]);

  const handlePersonalInfoUpdate = useCallback(async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          name: newName,
          gender: newGender,
          email: newEmail,
          phone: newPhone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsUpdatingInfo(true);
        setIsEditingInfo(false);
      } else {
        throw new Error("Error updating user data");
      }
    } catch (error) {
      console.error("Failed to update user data", error);
    }
  }, [newName, newEmail, newGender, newPhone, user._id]);

  const openPersonalInfoDialog = useCallback(() => {
    if (!newName || !newEmail || !newGender || !newPhone) {
      alert("Please fill in all fields");
    } else if (!emailRegex.test(newEmail)) {
      alert("Please enter a valid email address");
    } else if (newPhone.length !== 10 || isNaN(Number(newPhone))) {
      alert("Please enter a valid phone number");
    } else if (
      confirm("Are you sure you want to update your personal information?")
    ) {
      setIsUpdatingInfo(false);
      handlePersonalInfoUpdate();
    } else {
      resetForm();
    }
  }, [newName, newEmail, newGender, handlePersonalInfoUpdate, resetForm]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setNewImg(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleProfilePictureUpdate = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("userId", user._id);

    try {
      const response = await fetch("/api/user/updateProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setNewImg(user.imgURL); // Update with new image
      } else {
        const data = await response.json();
        throw new Error(data.message || "Error updating profile picture");
      }
    } catch (error) {
      console.error("Failed to update profile picture", error);
    }
  };

  const openProfileDialog = () => {
    if (!selectedImage) {
      alert("Please select an image to upload");
      return;
    }
    if (confirm("Are you sure you want to update your profile picture?")) {
      handleProfilePictureUpdate();
    } else {
      setNewImg(user.imgURL);
    }
  };

  const buttonClasses =
    "h-full flex justify-center items-center font-semibold px-4 py-2 rounded-[8px] hover:shadow-md transition-all duration-300";

  return (
    <div className="flex items-center w-full h-[76vh]">
      <div className="flex flex-col justify-center items-center w-1/3 h-full">
        <Image
          src={newImg}
          alt={user.name}
          width={200}
          height={200}
          className="rounded-full w-[350px] h-[350px] object-cover border-2 border-gray-700 shadow-md"
        />
        <div className="flex gap-x-2 p-2 mt-5 w-[350px] items-center">
          <label
            htmlFor="file-upload"
            className={`${buttonClasses} gap-2 border-black border-2 bg-white text-black hover:bg-black hover:text-white`}
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            Upload <UploadCloud className="w-6 h-6" />
          </label>
          <button
            className={`${buttonClasses} bg-black text-white hover:bg-white hover:text-black border-2 border-black`}
            onClick={openProfileDialog}
          >
            Update Image
          </button>
        </div>
      </div>

      <hr className="h-[80%] border-r-[2px] border-gray-300" />

      <div className="flex flex-col w-2/3 h-full">
        <div className="flex flex-col">
          <h1 className="text-[35px] font-bold ml-10 mt-10">Your Profile</h1>

          <div className="flex flex-col ml-10 mt-5">
            <div className="flex gap-3 items-center text-gray-600">
              <h2 className="text-[20px] font-semibold">
                Personal Information
              </h2>
              {isEditingInfo ? (
                isUpdatingInfo ? (
                  <button
                    onClick={openPersonalInfoDialog}
                    className="flex items-center gap-2 text-gray-600 hover:text-black"
                  >
                    <CheckCheck size={20} />
                    <span>Save</span>
                  </button>
                ) : (
                  <Loader size={20} className="animate-spin" />
                )
              ) : (
                <button onClick={() => setIsEditingInfo(true)}>
                  <Pencil size={20} />
                </button>
              )}
            </div>

            <div className="relative mt-3 p-2 border-2 rounded-xl border-gray-600 w-[400px]">
              <input
                title="name"
                type="text"
                value={newName}
                disabled={!isEditingInfo}
                onChange={(e) => setNewName(e.target.value)}
                className={`border-none focus:outline-none text-xl w-full rounded-md text-gray-500 ${
                  !isEditingInfo && "cursor-not-allowed"
                }`}
              />
              <span className="absolute top-[-12px] left-5 px-2 bg-white font-bold text-sm">
                Your name
              </span>
            </div>

            <div className="relative mt-5 p-2 border-2 rounded-xl border-gray-600 w-[400px]">
              <label className="mr-4 text-gray-500">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  disabled={!isEditingInfo}
                  checked={newGender === "male"}
                  onChange={(e) => setNewGender(e.target.value)}
                  className={`mr-1 ${!isEditingInfo && "cursor-not-allowed"}`}
                />
                Male
              </label>
              <label className="text-gray-500">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  disabled={!isEditingInfo}
                  checked={newGender === "female"}
                  onChange={(e) => setNewGender(e.target.value)}
                  className={`mr-1 ${!isEditingInfo && "cursor-not-allowed"}`}
                />
                Female
              </label>
              <span className="absolute top-[-12px] left-5 px-2 bg-white font-bold text-sm">
                Your gender
              </span>
            </div>

            <div className="relative mt-5 p-2 border-2 rounded-xl border-gray-600 w-[400px]">
              <input
                type="text"
                title="email"
                value={newEmail}
                disabled={!isEditingInfo}
                onChange={(e) => setNewEmail(e.target.value)}
                className={`border-none focus:outline-none text-xl w-full rounded-md text-gray-500 ${
                  !isEditingInfo && "cursor-not-allowed"
                }`}
              />
              <span className="absolute top-[-12px] left-5 px-2 bg-white font-bold text-sm">
                Your email
              </span>
            </div>
            <div className="flex gap-x-2 items-center text-gray-600">
              <div className="relative mt-5 p-2 border-2 rounded-xl border-gray-600 w-[400px]">
                <input
                  type="text"
                  title="phone"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  disabled={!isEditingInfo}
                  className={`border-none focus:outline-none text-xl w-full rounded-md text-gray-500 ${
                    !isEditingInfo && "cursor-not-allowed"
                  }`}
                />
                <span className="absolute top-[-12px] left-5 px-2 bg-white font-bold text-sm">
                  Your phone
                </span>
              </div>
              <span className=" bg-white font-bold text-sm mt-4">
                Verfied {user.isVerified ? "✅" : "❌"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex ml-10  mt-10 items-center text-gray-600">
          <div className="flex gap-3 items-center text-gray-600">
            <h2 className="text-[20px] font-semibold">Manage Address</h2>
            {isEditingAddress ? (
              <button
                onClick={openPersonalInfoDialog}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
              >
                <CheckCheck size={20} />
                <span>Save</span>
              </button>
            ) : (
              <button onClick={() => setIsEditingInfo(true)}>
                <Pencil size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
