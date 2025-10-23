"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = { name: "", email: "", password: "" };
        let hasError = false;

        // validasi nama
        if (!formData.name.trim()) {
            newErrors.name = "Nama tidak boleh kosong!";
            hasError = true;
        } else if (/\d/.test(formData.name)) {
            newErrors.name = "Nama tidak boleh mengandung angka!";
            hasError = true;
        }

        // validasi email
        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi!";
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Alamat email harus mengandung '@'.";
            hasError = true;
        }

        // validasi password
        if (!formData.password.trim()) {
            newErrors.password = "Password wajib diisi!";
            hasError = true;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password harus kombinasi huruf besar, kecil, dan angka.";
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError) {
            alert("Pendaftaran berhasil ⚔️");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Form Registrasi</h1>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label>Nama Lengkap</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>

                    <div className={styles.field}>
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Masukkan email aktif"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.field}>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Masukkan password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className={styles.error}>{errors.password}</p>
                        )}
                    </div>

                    <button type="submit" className={styles.button}>
                        Daftar Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
}
