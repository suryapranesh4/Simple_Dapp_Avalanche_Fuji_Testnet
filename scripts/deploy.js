async function main() {
  const HelloWorldFactory = await ethers.getContractFactory("HelloWorld");
  const message = await HelloWorldFactory.deploy("Hello World!");
  await message.deployed();
  console.log("Contract deployed to: ", message.address);
  console.log("Contract deployed by: " + JSON.stringify(message.signer));
  process.exit(0);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
