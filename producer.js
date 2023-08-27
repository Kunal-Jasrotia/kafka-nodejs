const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Initializes the Kafka producer and sets up a readline interface to take user input.
 */
async function init() {
    // Create Kafka producer
    const producer = kafka.producer();

    console.log("Connecting Producer");
    // Connect the producer to Kafka
    await producer.connect();
    console.log("Producer Connected Successfully");

    // Set up readline interface
    rl.setPrompt("> ");
    rl.prompt();

    // Handle user input
    rl.on("line", async function (line) {
        // Parse rider name and location from input line
        const [riderName, location] = line.split(" ");
        // Send location update to Kafka topic
        await producer.send({
            topic: "test-topic",
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, location }),
                },
            ],
        });
    }).on("close", async () => {
        // Disconnect the producer when readline interface is closed
        await producer.disconnect();
    });
}

init();