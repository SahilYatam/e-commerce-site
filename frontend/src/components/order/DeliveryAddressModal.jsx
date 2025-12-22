import { useState } from "react"
import Button from "../common/Button.jsx"

const DeliveryAddressModal = ({ onSubmit, onClose }) => {
    const [address, setAddress] = useState("");

    const handleSubmit = () => {
        if (!address.trim()) return;
        onSubmit(address.trim());
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    Enter Delivery Address
                </h2>

                <input
                    type="text"
                    className="w-full border px-4 py-2 rounded mb-4 text-black"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <Button onClick={onClose} className="bg-gray-200 text-black">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="bg-blue-600 text-white">
                        Continue
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default DeliveryAddressModal