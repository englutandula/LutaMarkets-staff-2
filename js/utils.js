// LutaMarkets – Utility Functions

/**
 * Format a number with comma separators
 * e.g. 1200000 → "1,200,000"
 */
function formatCurrency(amount) {
    if (amount == null || isNaN(amount)) return '0';
    return Number(amount).toLocaleString('en-US');
}

/**
 * Generate a receipt number in format: NAM-DDMMYYYY
 * e.g. if studentName is "EMANUEL" and date is 27/02/2026 → "EMA-27022026"
 * @param {string} [studentName] - The student's full name (optional)
 */
function generateReceiptNumber(studentName) {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const datePart = `${dd}${mm}${yyyy}`;

    // Get first 3 uppercase letters from the student name
    let prefix = 'LMR'; // fallback if no name
    if (studentName && studentName.trim().length >= 3) {
        prefix = studentName.trim().substring(0, 3).toUpperCase();
    } else if (studentName && studentName.trim().length > 0) {
        prefix = studentName.trim().toUpperCase().padEnd(3, 'X');
    }

    return `${prefix}-${datePart}`;
}

/**
 * Get initials from a full name, e.g. "Juma Mussa" → "JM"
 */
function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Approximate exchange rate to nearest hundred
 * e.g. 2570 → 2600, 2530 → 2500
 */
function approximateRate(rate) {
    return Math.round(rate / 100) * 100;
}

/**
 * Convert all images inside an element to base64 data URLs
 * This prevents CORS issues when using html2canvas on file:// protocol
 */
async function convertImagesToBase64(element) {
    const images = element.querySelectorAll('img');
    const promises = [];

    images.forEach(img => {
        if (img.src && !img.src.startsWith('data:')) {
            const promise = new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const tempImg = new Image();
                tempImg.crossOrigin = 'anonymous';
                tempImg.onload = () => {
                    canvas.width = tempImg.naturalWidth;
                    canvas.height = tempImg.naturalHeight;
                    ctx.drawImage(tempImg, 0, 0);
                    try {
                        img.src = canvas.toDataURL('image/png');
                    } catch (e) {
                        // If tainted, just leave the original src
                    }
                    resolve();
                };
                tempImg.onerror = () => resolve();
                tempImg.src = img.src;
            });
            promises.push(promise);
        }
    });

    await Promise.all(promises);
}

/**
 * Download an HTML element as a PNG image using html2canvas
 */
async function downloadReceiptAsPNG(elementId, filename) {
    const element = document.getElementById(elementId);
    if (!element) {
        alert('Receipt element not found. Please try again.');
        return;
    }

    try {
        // Convert images to base64 first to avoid CORS issues
        await convertImagesToBase64(element);

        // Small delay to let images update
        await new Promise(r => setTimeout(r, 200));

        const canvas = await html2canvas(element, {
            scale: 4,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            imageTimeout: 5000
        });

        const link = document.createElement('a');
        link.download = filename || 'LutaMarkets_Receipt.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error('Error generating receipt PNG:', err);
        // Fallback: try without images
        try {
            const imgs = element.querySelectorAll('img');
            imgs.forEach(img => img.style.display = 'none');

            const canvas = await html2canvas(element, {
                scale: 4,
                backgroundColor: '#ffffff',
                logging: false
            });

            imgs.forEach(img => img.style.display = '');

            const link = document.createElement('a');
            link.download = filename || 'LutaMarkets_Receipt.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err2) {
            console.error('Fallback also failed:', err2);
            alert('Failed to download receipt. Please try again.');
        }
    }
}

/**
 * Generate a unique ID
 */
function generateId() {
    return 'st_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
}

/**
 * Format date as "Feb 26, 2026"
 */
function formatDate(dateStr) {
    const d = dateStr ? new Date(dateStr) : new Date();
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format date as "February 26, 2026"
 */
function formatDateLong(dateStr) {
    const d = dateStr ? new Date(dateStr) : new Date();
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
