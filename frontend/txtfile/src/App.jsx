import { useState } from "react";
import "./App.css";
import imgLogo from "./recursos/imglogo.png";
import fbIcon from "./recursos/fb.png";
import xIcon from "./recursos/x.png";
import ytIcon from "./recursos/yt.png";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleProcess = async () => {
    if (!fileContent) {
      alert("Por favor, selecciona un archivo TXT primero");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: fileContent }),
      });

      const data = await response.json();
      setApiResponse(data.result || data.message);

      const showDiv = document.getElementById("show");
      if (showDiv) {
        showDiv.textContent = data.result || data.message;
      }
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      setApiResponse("Error al conectar con el servidor");

      const showDiv = document.getElementById("show");
      if (showDiv) {
        showDiv.textContent = "Error al conectar con el servidor";
      }
    }
  };

  return (
    <>
      <div id="contenedorprimario">
        <div id="barramenu">
          <div id="imgdiv">
            <img id="imglogo" src={imgLogo} alt="" />
            <div id="txtimg">App.txt</div>
          </div>
          <div id="redes">
            <div id="txtglobal">
              <div id="bk"></div>
              <div id="txtredes">Follow us:</div>
            </div>
            <div id="logosredes">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="fblogo"
              >
                <img src={fbIcon} alt="" className="fblogo" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ytlogo"
              >
                <img src={ytIcon} alt="" className="ytlogo" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="xlogo"
              >
                <img src={xIcon} alt="" className="xlogo" />
              </a>
            </div>
          </div>
        </div>
        <div id="txtsubir">
          <div id="stxt">Sube tu archivo</div>
          <input
            type="file"
            id="fileInput"
            accept=".txt"
            onChange={handleFileChange}
          />
          <button id="Procesar" onClick={handleProcess}>
            Procesar
          </button>
        </div>
        <div id="show"></div>
      </div>
    </>
  );
}

export default App;
