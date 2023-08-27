const { kafka } = require("./client");
const group = process.argv[2];

/**
 * Initializes the Kafka consumer and subscribes to a topic.
 * @param {string} group - The consumer group ID.
 * @param {string} topic - The topic to subscribe to.
 */
async function init(group, topic) {
    // Create the Kafka consumer with the specified consumer group ID
    const consumer = kafka.consumer({ groupId: group });

    // Connect to the Kafka broker
    await consumer.connect();

    // Subscribe to the specified topic and start consuming messages from the beginning
    await consumer.subscribe({ topics: [topic], fromBeginning: true });

    // Start consuming messages from the subscribed topic
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Print the consumed message to the console
            console.log(
                `${group}: [${topic}]: PART:${partition}:`,
                message.value.toString()
            );
        },
    });
}

init();