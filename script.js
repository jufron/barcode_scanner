const videoElement = document.getElementById('camera-stream');
const resultElement = document.getElementById('barcode-result');

if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
    // safely access `navigator.mediaDevices.getUserMedia`
        
    // Request access to the camera
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment' // Use rear camera for barcode scanning
            }
        })
        .then(stream => {
            // Assign the stream to the video element's source
            videoElement.srcObject = stream;
        })
        .catch(error => {
            alert(`Error accessing camera: , ${error}`);
            console.error("Error accessing camera: ", error);
        });
} else {
    alert('Camera access is not supported on this device or browser.');
    console.error("Camera access is not supported on this device or browser.");
}

Quagga.init({
    inputStream : {
        name : "Live",
        type : "LiveStream",
        constraints: {
            facingMode: "environment" // Rear camera
        },
        // target: document.querySelector('#cameraScanner')    // Or '#yourElement' (optional)
        target: videoElement
    },
    decoder : {
      readers : ["code_128_reader"]
    },
    locator: {
        patchSize: "medium", // x-small, small, medium, large, x-large
    },
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    // Quagga.stop();
  });

Quagga.onDetected(function(result) {
    const code = result.codeResult.code;
    document.getElementById('barcode-result').innerText = code;
    alert(`barcode detected : ${code}`);

    console.log("Barcode detected: ", code);
    // Quagga.stop(); // Uncomment jika ingin menghentikan scanner setelah deteksi
});
