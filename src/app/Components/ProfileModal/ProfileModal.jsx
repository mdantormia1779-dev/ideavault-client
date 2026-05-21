"use client";

import { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { toast } from "react-toastify";

const ProfileModal = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const userId = user?.id || user?._id;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/profile/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            image: form.image,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      // 🔥 update UI without reload
      setUser({
        ...user,
        name: form.name,
        image: form.image,
      });

      toast.success("Profile updated successfully!");
      setIsOpen(false);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      
      {/* Trigger Button */}
      <Button
        onPress={() => setIsOpen(true)}
        className="w-full mt-8 h-11 font-medium rounded-2xl bg-linear-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white shadow-md transition-all"
      >
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">

            <Modal.CloseTrigger />

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">

                  {/* Name */}
                  <TextField>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="text-gray-800 placeholder:text-gray-400"
                    />
                  </TextField>

                  {/* Email (disabled - safe fix) */}
                  <TextField>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={form.email}
                      disabled
                      className="text-gray-800 placeholder:text-gray-400"
                    />
                  </TextField>

                  {/* Image */}
                  <TextField>
                    <Label>Image URL</Label>
                    <Input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Enter your image url"
                      className="text-gray-800 placeholder:text-gray-400"
                    />
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button
                onPress={handleUpdate}
                className="bg-violet-600 text-white"
                isLoading={loading}
              >
                Update Profile
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ProfileModal;