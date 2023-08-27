const { kafka } = require("./client");

/**
 * Initializes the Kafka admin and creates a topic.
 */
async function init() {
    // Create a Kafka admin instance
    const admin = kafka.admin();

    // Connect to the Kafka admin
    console.log("Admin connecting...");
    admin.connect();
    console.log("Admin Connection Success...");

    // Create a topic with two partitions
    console.log("Creating Topic [test-topic]");
    await admin.createTopics({
        topics: [
            {
                topic: "test-topic",
                numPartitions: 2,
            },
        ],
    });
    console.log("Topic Created Success [test-topic]");

    // Disconnect from the Kafka admin
    console.log("Disconnecting Admin..");
    await admin.disconnect();
}

init();