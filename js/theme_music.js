window.addEventListener('load', () => {
    const audio = new Audio();
    const playAudio = async () => {
        try {
            const response = await fetch('https://getstream-openfxt.vercel.app/getStream', { headers: { 'Range': 'bytes=0-' } });
            if (response.status !== 206) throw new Error('Failed to fetch audio stream');
            const blob = await response.blob();
            audio.src = URL.createObjectURL(blob);
            audio.play();
        } catch (error) {
            console.error('Error fetching audio stream:', error);
        }
        window.removeEventListener('click', playAudio);
        window.removeEventListener('scroll', playAudio);
    };
    window.addEventListener('click', playAudio);
    window.addEventListener('scroll', playAudio);
});
