// upload.js
const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log('Image uploaded:', data);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
});
