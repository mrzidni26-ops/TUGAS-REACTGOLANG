// Ambil inisial (maksimal 2 huruf) dari nama lengkap
export const initials = (name: string): string => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Pilih warna avatar yang konsisten berdasarkan id
export const tone = (id: number): string => `avatar--t${Math.abs(id) % 5}`;
