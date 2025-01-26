using core.Data;
using Microsoft.Extensions.Configuration;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;
using System.ClientModel;
using System.Collections.Generic;

namespace core.MessageAppliction.Logic
{
    class MessageLogic
    {
        public static bool AnalyseConversation(DataContext ctx, IConfiguration config)
        {
            var client = new OpenAIClient(config.GetValue<string>("OpenAI.ApiKey")).GetAssistantClient();

            ChatCompletionOptions options = new()
            {
                ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(
                    jsonSchemaFormatName: "chat-analysis-assistant",
                    jsonSchema: BinaryData.FromBytes("""
            {
                "type": "object",
                "properties": {
                "ConflictPotential": { "type": "double" },
                "SensitiveLeak": { "type": "double" },
                "Phrases1": { "type": "array", "items": { "type": "string" } },
                "Phrases2": { "type": "array", "items": { "type": "string" } },
                "required": ["ConflictPotential", "SensitiveLeak", "Phrases1", "Phrases2" ],
            }
            """u8.ToArray()),
                    jsonSchemaIsStrict: true)
            };

            AssistantCreationOptions assistantOptions = new()
            {
                Name = "Chat Analysis Assistant",
                Instructions = "The output structure must be a valid JSON object with a structure like: { \"ConflictPotential\": double, \"SensitiveLeak\": double, \"CriticalPhrases\": string[] } Your actual task is: You read the chats of employees to find potential foul language, use of swear words, conflict potential of leakage of confidential information. After reading you should analyse and estimate how likely this text is critical in any of the mentioned areas. Highlight any sections that support your reasoning."
            };
            Assistant assistant = client.CreateAssistant("gpt-4o", assistantOptions);
            ThreadCreationOptions threadOptions = new()
            {
    
                InitialMessages = { new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() {"Alex: Hi Jamie, what's up?" }),
                        new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() {"Jamie: Not much what about you?"}),
                        new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() {"Alex: Fancy grabbing some Sushi for lunch today?" }),
                        new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() {"Jamie: Nice plan let's do that." }),
                        new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() { "Alex: In 10 at the parking lot?" }),
                        new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() {"Jamie: Aight" }),

                }
            };

            ThreadRun threadRun = client.CreateThreadAndRun(assistant.Id, threadOptions);

            do
            {
                Thread.Sleep(TimeSpan.FromSeconds(1));
                threadRun = client.GetRun(threadRun.ThreadId, threadRun.Id);
            } while (!threadRun.Status.IsTerminal);

            CollectionResult<ThreadMessage> messages = client.GetMessages(threadRun.ThreadId, new MessageCollectionOptions() { Order = MessageCollectionOrder.Ascending });

            return false;
        }
    }
}
