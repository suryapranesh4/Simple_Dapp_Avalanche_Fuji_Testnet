import { useState } from "react";
import { ethers } from "ethers";
import HelloWorld from "./artifacts/contracts/HelloWorld.sol/HelloWorld.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  const [hello, setHelloValue] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchHello() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        contractAddress,

        HelloWorld.abi,

        provider
      );

      try {
        const data = await contract.hello();

        setHelloValue(data);

        console.log("Greeting: ", data);

        console.log("Contract Address: ", contract.address);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setHello() {
    if (!hello) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,

        HelloWorld.abi,

        signer
      );

      const transaction = await contract.setHello(hello);

      await transaction.wait();

      fetchHello();
    }
  }

  return (
    <div>
      <main>
        <h3>Avalanche Dapp</h3>

        <button onClick={fetchHello}>Display Message</button>

        <input
          onChange={(e) => setHelloValue(e.target.value)}
          placeholder="Enter new message"
        />

        <button onClick={setHello}>Store Message</button>

        <div>&nbsp;</div>

        <div>
          Stored Message: <h3>{hello}</h3>{" "}
        </div>
      </main>
    </div>
  );
}

export default App;
