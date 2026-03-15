import { Link } from "react-router-dom";
import { ShoppingCart, Package, BarChart3, Users } from "lucide-react";
import logo from "../../../assets/logo.png"

export default function HomePage() {
    return (
        <div className="bg-white text-black min-h-screen">

            <nav className="border-b bg-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="AbhiPOS Logo"
                            className="h-10 md:h-14 w-auto object-contain"
                        />

                        <span className="text-xl font-semibold tracking-wide sr-only">
                            AbhiPOS
                        </span>
                    </div>

                    <div className="flex items-center gap-6 justify-center">
                        <a href="/" className="text-sm hover:text-gray-600">Home</a>
                        <a href="#features" className="text-sm hover:text-gray-600">Features</a>

                        <Link
                            to="auth/login"
                            className="px-4 py-1.5 border rounded-lg hover:bg-black hover:text-white transition"
                        >
                            Login
                        </Link>
                    </div>

                </div>
            </nav>

            <section className="pt-24 pb-20 px-6 bg-gray-50">

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>

                        <span className="inline-block text-sm border px-3 py-1 rounded-full mb-4">
                            Smart Retail POS
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                            Manage Your Store
                            <span className="block text-gray-500">
                                With One Powerful POS
                            </span>
                        </h1>

                        <p className="mt-6 text-gray-600 text-lg">
                            Track inventory, process orders, and generate professional
                            bills effortlessly with a powerful POS platform built
                            for modern businesses.
                        </p>

                        <div className="mt-8 flex gap-4">

                            <Link
                                to="auth/login"
                                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="auth/register"
                                className="px-6 py-3 border rounded-lg hover:border-black transition"
                            >
                                Create Account
                            </Link>

                        </div>

                    </div>


                    <div className="hover:shadow-lg transition">

                        <img
                            src='/src/assets/POS-hero.png'
                            alt="POS Dashboard"
                            className="rounded-xl shadow-xl border"
                        />

                    </div>

                </div>

            </section>

            {/* FEATURES */}
            <section id="features" className="py-20 px-6">

                <div className="max-w-7xl mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-12">
                        Powerful Tools For Your Store
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">

                        <div className="border rounded-xl p-6 hover:shadow-lg transition hover:scale-105">
                            <Package className="w-10 h-10 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Product Management
                            </h3>
                            <p className="text-gray-600">
                                Add, edit and manage products with real-time inventory tracking.
                            </p>
                        </div>

                        <div className="border rounded-xl p-6 hover:shadow-lg transition hover:scale-105">
                            <ShoppingCart className="w-10 h-10 mb-4 " />
                            <h3 className="text-xl font-semibold mb-2">
                                Fast Checkout
                            </h3>
                            <p className="text-gray-600">
                                Seamless cart system with quick billing and order processing.
                            </p>
                        </div>

                        <div className="border rounded-xl p-6 hover:shadow-lg transition hover:scale-105">
                            <BarChart3 className="w-10 h-10 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Sales Tracking
                            </h3>
                            <p className="text-gray-600">
                                Monitor sales, orders and inventory from one simple dashboard.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* STATS */}
            <section className="bg-gray-100 py-20">

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

                    <div className="border rounded-xl p-6 hover:shadow-lg transition hover:scale-105">
                        <Users className="mx-auto w-10 h-10 mb-3" />
                        <h3 className="text-4xl font-bold">100+</h3>
                        <p className="text-gray-600">Active Users</p>
                    </div>

                    <div className="border rounded-xl p-6 hover:shadow-lg transition hover:scale-105">
                        <ShoppingCart className="mx-auto w-10 h-10 mb-3" />
                        <h3 className="text-4xl font-bold">500+</h3>
                        <p className="text-gray-600">Orders Processed</p>
                    </div>

                    <div className="border rounded-xl p-6 hover:shadow-lg transition hover:scale-105">
                        <Package className="mx-auto w-10 h-10 mb-3" />
                        <h3 className="text-4xl font-bold">1000+</h3>
                        <p className="text-gray-600">Products Managed</p>
                    </div>

                </div>

            </section>

            {/* FINAL CTA */}
            <section className="py-20 text-center px-6">

                <h2 className="text-3xl font-bold">
                    Ready To Simplify Your Store Management?
                </h2>

                <p className="text-gray-600 mt-4">
                    Start using our POS system and streamline your business operations.
                </p>

                <Link
                    to="/login"
                    className="inline-block mt-6 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Start Now
                </Link>

            </section>

            {/* FOOTER */}
            <footer className="border-t py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} POS System. All rights reserved.
            </footer>

        </div>
    );
}