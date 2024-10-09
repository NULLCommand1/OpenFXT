document.addEventListener('DOMContentLoaded', () => {
    let audioElement;

    const handleClick = async () => {
        if (!audioElement) {
            audioElement = document.createElement('audio');
            audioElement.controls = true;
            document.body.appendChild(audioElement);

            try {
                const response = await fetch('https://getstream-openfxt.vercel.app/getStream', {
                    headers: { 'Range': 'bytes=0-' }
                });

                if (!response.ok || response.status !== 206) {
                    throw new Error('Unable to stream audio.');
                }

                const reader = response.body.getReader();
                const stream = new ReadableStream({
                    start(controller) {
                        const push = async () => {
                            const { done, value } = await reader.read();
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            push();
                        };
                        push();
                    }
                });

                const newResponse = new Response(stream);
                const blob = await newResponse.blob();
                const audioURL = URL.createObjectURL(blob);
                audioElement.src = audioURL;
                audioElement.play();
            } catch (err) {
                console.error('Streaming error:', err);
            }
        } else {
            audioElement.play();
        }
    };

    document.addEventListener('click', handleClick, { once: true });
});