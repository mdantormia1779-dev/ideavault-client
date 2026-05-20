"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

const ProfileModal = ({ user }) => {
    return (
        <Modal>
            {/* Trigger Button */}
            <Button className="w-full mt-8 h-11 font-medium rounded-2xl bg-linear-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white shadow-md transition-all duration-300 active:scale-[0.98]">
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
                                    <TextField defaultValue={user?.name || ""} className="w-full" name="name" type="text" variant="secondary">
                                        <Label>Name</Label>
                                        <Input
                                            className="text-gray-800 placeholder:text-gray-400"
                                            placeholder="Enter your name"
                                        />
                                    </TextField>

                                    {/* Email */}
                                    <TextField defaultValue={user?.email || ""} className="w-full" name="email" type="email" variant="secondary">
                                        <Label>Email</Label>
                                        <Input
                                            className="text-gray-800 placeholder:text-gray-400"
                                            placeholder="Enter your email"
                                        />
                                    </TextField>

                                    {/* Image URL */}
                                    <TextField defaultValue={user?.image || ""} className="w-full" name="image" type="text" variant="secondary">
                                        <Label>Image URL</Label>
                                        <Input
                                            className="text-gray-800 placeholder:text-gray-400"
                                            placeholder="Enter your image url"
                                        />
                                    </TextField>

                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>

                            <Button slot="close" className="bg-violet-600 text-white">
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