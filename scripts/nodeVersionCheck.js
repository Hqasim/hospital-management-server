const NODE_VERSION_LOCK = "20.11.0"; // This node version is to be use to develop and commit
const currentVersion = process?.versions?.node;

if (currentVersion === NODE_VERSION_LOCK) {
  console.log(`*** Node Version: ${currentVersion} accepted ***`);
} else if (currentVersion !== NODE_VERSION_LOCK) {
  console.log(
    `*** Node Version: ${currentVersion} does not match required version: ${NODE_VERSION_LOCK} ***`
  );
  process.exit(1);
} else {
  console.log(`*** Something went wrong while checking Node version ***`);
  process.exit(1);
}
