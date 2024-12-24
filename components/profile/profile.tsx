"use client"; // Mark this as a client-side component
import { CheckCheck, Loader, Pencil, UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  label: string;
  phoneNumber: string;
  addId?: string;
}

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
    addresses: Address[];
  };
}

const Profile = ({ user }: ProfileProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newGender, setNewGender] = useState(user.gender);
  const [newImg, setNewImg] = useState(user.imgURL);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(true);
  const [isDeletingAddress, setIsDeletingAddress] = useState<number | null>(
    null
  );

  const [newAddress, setNewAddress] = useState(user.addresses);

  const [newAddressForm, setNewAddressForm] = useState<Address>({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    label: "",
    phoneNumber: "",
  });

  const resetForm = useCallback(() => {
    setNewName(user.name);
    setNewEmail(user.email);
    setNewGender(user.gender);
    setNewPhone(user.phone);
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
  }, [
    newName,
    newEmail,
    newGender,
    newPhone,
    handlePersonalInfoUpdate,
    resetForm,
  ]);

  const removeAddress = async (index: number) => {
    setIsDeletingAddress(index);
    try {
      const response = await fetch("/api/user/updateAdress", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          address: newAddress[index],
          action: "remove",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsUpdatingAddress(true);
        setNewAddress(newAddress.filter((_, i) => i !== index));
      } else {
        throw new Error("Error updating address");
      }
    } catch (error) {
      console.error("Failed to update address", error);
    } finally {
      setIsDeletingAddress(null);
    }
  };
  const handleNewAddressChange = (key: string, value: string) => {
    setNewAddressForm((prev) => ({ ...prev, [key]: value }));
  };
  const addAddress = async (address: Address) => {
    setIsUpdatingAddress(false);
    try {
      const response = await fetch("/api/user/updateAdress", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          address,
          action: "add",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsUpdatingAddress(true);
        setNewAddress([...newAddress, address]);
      } else {
        throw new Error("Error updating address");
      }
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };
  const addNewAddress = async () => {
    if (confirm("Are you sure you want to add this address?")) {
      const addressWithId = {
        ...newAddressForm,
        addId: Math.random().toString(36).substring(7),
      };
      setNewAddress([...newAddress, addressWithId]);
      addAddress(addressWithId);
      setNewAddressForm({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        label: "",
        phoneNumber: "",
      });
    } else {
      setNewAddressForm({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        label: "",
        phoneNumber: "",
      });
    }
  };
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

  const updateAddress = async () => {
    try {
      const response = await fetch("/api/user/updateAdress", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          addresses: newAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsUpdatingAddress(true);
        setIsEditingAddress(false);
      } else {
        throw new Error("Error updating address");
      }
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  const handleAddressChange = (index: number, key: string, value: string) => {
    const updatedAddress = [...newAddress];
    if (key === "phoneNumber") {
      updatedAddress[index].phoneNumber = value;
    } else if (key === "postalCode") {
      updatedAddress[index].postalCode = value;
    } else if (key === "label") {
      updatedAddress[index].label = value;
    } else if (key === "country") {
      updatedAddress[index].country = value;
    } else if (key === "state") {
      updatedAddress[index].state = value;
    } else if (key === "city") {
      updatedAddress[index].city = value;
    } else if (key === "street") {
      updatedAddress[index].street = value;
    }
    setNewAddress(updatedAddress);
  };

  const openAddressDialog = async () => {
    if (confirm("Are you sure you want to update your address?")) {
      setIsUpdatingAddress(false);
      await updateAddress();
    } else {
      setIsEditingAddress(false);
    }
  };

  const buttonClasses =
    "h-full flex justify-center items-center font-semibold px-4 py-2 rounded-[8px] hover:shadow-md transition-all duration-300";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Profile Image Section */}
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={newImg || "/placeholder.jpg"}
                    alt={user.name}
                    className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
                  >
                    <UploadCloud className="w-6 h-6 text-gray-600" />
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {selectedImage && (
                  <button
                    onClick={openProfileDialog}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Update Profile Picture
                  </button>
                )}
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>
                {isEditingInfo ? (
                  isUpdatingInfo ? (
                    <button
                      onClick={openPersonalInfoDialog}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                    >
                      <CheckCheck className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                  ) : (
                    <Loader className="w-5 h-5 animate-spin text-gray-600" />
                  )
                ) : (
                  <button
                    onClick={() => setIsEditingInfo(true)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  >
                    <Pencil className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={newName}
                    disabled={!isEditingInfo}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-gray-600">
                    Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    value={newEmail}
                    disabled={!isEditingInfo}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Your email"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-gray-600">
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    value={newPhone}
                    disabled={!isEditingInfo}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Your phone"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-gray-600">
                    Phone
                  </label>
                  {user.isVerified && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={newGender === "male"}
                      disabled={!isEditingInfo}
                      onChange={(e) => setNewGender(e.target.value)}
                      className="form-radio h-4 w-4 text-black"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={newGender === "female"}
                      disabled={!isEditingInfo}
                      onChange={(e) => setNewGender(e.target.value)}
                      className="form-radio h-4 w-4 text-black"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Address Information
              </h2>
              {isEditingAddress ? (
                isUpdatingAddress ? (
                  <button
                    onClick={openAddressDialog}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <CheckCheck className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                ) : (
                  <Loader className="w-5 h-5 animate-spin text-gray-600" />
                )
              ) : (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {newAddress.length > 0 ? (
              newAddress.map((address, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={address.street}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(index, "street", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Street address"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        Street
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={address.city}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(index, "city", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="City"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        City
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={address.state}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(index, "state", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="State"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        State
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={address.country}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(index, "country", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Country"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        Country
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={address.postalCode}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(
                            index,
                            "postalCode",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Postal code"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        Postal Code
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={address.phoneNumber}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(
                            index,
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Phone number"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        Phone Number
                      </label>
                    </div>

                    <div className="relative md:col-span-2">
                      <input
                        type="text"
                        value={address.label}
                        disabled={!isEditingAddress}
                        onChange={(e) =>
                          handleAddressChange(index, "label", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Address label (e.g., Home, Work)"
                      />
                      <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                        Label
                      </label>
                    </div>
                    <div className={`relative md:col-span-2 `}>
                      <button
                        onClick={() => {
                          removeAddress(index);
                        }}
                        disabled={!isEditingAddress}
                        className="absolute -top-2 text-red-500 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-600">No addresses found</p>
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={newAddressForm.street}
                    onChange={(e) =>
                      handleNewAddressChange("street", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Street address"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Street
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={newAddressForm.city}
                    onChange={(e) =>
                      handleNewAddressChange("city", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="City"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    City
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={newAddressForm.state}
                    onChange={(e) =>
                      handleNewAddressChange("state", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="State"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    State
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={newAddressForm.country}
                    onChange={(e) =>
                      handleNewAddressChange("country", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Country"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Country
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={newAddressForm.postalCode}
                    onChange={(e) =>
                      handleNewAddressChange("postalCode", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Postal code"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Postal Code
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={newAddressForm.phoneNumber}
                    onChange={(e) =>
                      handleNewAddressChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Phone number"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Phone Number
                  </label>
                </div>

                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    value={newAddressForm.label}
                    onChange={(e) =>
                      handleNewAddressChange("label", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Address label (e.g., Home, Work)"
                  />
                  <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-sm text-gray-600">
                    Label
                  </label>
                </div>
                <div className="relative md:col-span-2">
                  <button
                    onClick={addNewAddress}
                    className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
