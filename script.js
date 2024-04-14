async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const messageDiv = document.getElementById('message');
    const inputField = document.getElementById('videoUrl');

    if (!videoUrl) {
      messageDiv.innerText = 'PLEASE PROVIDE A VALID FACEBOOK URL';
      messageDiv.style.color = '#fff';
      return;
    }
    messageDiv.innerText = 'PLEASE WAIT THE VIDEO IS PROCESSING [ CHECK THE DOWNLOADS TO SEE THE VIDEO ]';
    try {
      const response = await fetch(`https://hoanghao.me/api/facebook/download?url=${encodeURIComponent(videoUrl)}`);
      const { data } = await response.json();
      if (!data || !data.video || !data.title) {
        throw new Error('INVALID RESPONSE FROM THE SERVER CONTACT MARJHUN BAYLON');
      }
      const { video, title } = data;
      const randomString = Math.random().toString(36).substring(7);
      const videoResponse = await fetch(video);
      const videoBlob = await videoResponse.blob();
      const blobUrl = window.URL.createObjectURL(videoBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title}_${randomString}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      messageDiv.innerText = '[ DOWNLOAD COMPLETED. ENJOY OUR SERVICE! ]';
      messageDiv.style.color = '#fff';

      inputField.value = '';
    } catch (error) {
      messageDiv.innerText = `ERROR DOWNLOADING THE VIDEO: ${error}`;
      console.error(error);
    }
  }