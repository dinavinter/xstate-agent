const defs = {
    "name": "Scrren Set Builder",
    "description": "Gigya screen set genai builder",
    "sender": {
        "type": "userproxy",
        "config": {
            "name": "userproxy",
            "llm_config": false,
            "human_input_mode": "NEVER",
            "max_consecutive_auto_reply": 5,
            "system_message": "You are a helpful assistant.",
            "is_termination_msg": null,
            "code_execution_config": {"work_dir": null, "use_docker": false},
            "default_auto_reply": "TERMINATE"
        },
        "id": "69390af6-514b-48af-bd10-434aab14b05b",
        "timestamp": "2024-02-29T03:15:07.657756",
        "user_id": "default",
        "skills": null,
        "description": null
    },
    "receiver": {
        "type": "groupchat",
        "config": {
            "name": "groupchat_assistant",
            "llm_config": {
                "config_list": [{
                    "id": "7c680372-11c2-4f1e-8b05-23e39a8dc0fa",
                    "user_id": "guestuser@gmail.com",
                    "timestamp": "2024-02-29T01:48:37.738420",
                    "model": "d76615bc07d01db5",
                    "api_key": "********",
                    "base_url": "https://ai-cdp-dev.deno.dev/v2",
                    "api_type": "azure",
                    "api_version": "2024-02-15-preview",
                    "description": "AI CORE model - gpt4 32k"
                }], "temperature": 0.1, "cache_seed": null, "timeout": null
            },
            "human_input_mode": "NEVER",
            "max_consecutive_auto_reply": 8,
            "system_message": "You are a helpful assistant skilled at cordinating a group of other assistants to solve a task. ",
            "is_termination_msg": null,
            "code_execution_config": false,
            "default_auto_reply": ""
        },
        "groupchat_config": {
            "agents": [{
                "type": "assistant",
                "config": {
                    "name": "primary_assistant",
                    "llm_config": {
                        "config_list": [{
                            "id": "7c680372-11c2-4f1e-8b05-23e39a8dc0fa",
                            "user_id": "guestuser@gmail.com",
                            "timestamp": "2024-02-29T01:48:37.738420",
                            "model": "d76615bc07d01db5",
                            "api_key": "********",
                            "base_url": "https://ai-cdp-dev.deno.dev/v2",
                            "api_type": "azure",
                            "api_version": "2024-02-15-preview",
                            "description": "AI CORE model - gpt4 32k"
                        }], "temperature": 0.1, "cache_seed": null, "timeout": null
                    },
                    "human_input_mode": "NEVER",
                    "max_consecutive_auto_reply": 8,
                    "system_message": "You are a helpful AI assistant. Solve tasks using your coding and language skills. In the following cases, suggest python code (in a python coding block) or shell script (in a sh coding block) for the user to execute. 1. When you need to collect info, use the code to output the info you need, for example, browse or search the web, download/read a file, print the content of a webpage or a file, get the current date/time, check the operating system. After sufficient info is printed and the task is ready to be solved based on your language skill, you can solve the task by yourself. 2. When you need to perform some task with code, use the code to perform the task and output the result. Finish the task smartly. Solve the task step by step if you need to. If a plan is not provided, explain your plan first. Be clear which step uses code, and which step uses your language skill. When using code, you must indicate the script type in the code block. The user cannot provide any other feedback or perform any other action beyond executing the code you suggest. The user can't modify your code. So do not suggest incomplete code which requires users to modify. Don't use a code block if it's not intended to be executed by the user. If you want the user to save the code in a file before executing it, put # filename: <filename> inside the code block as the first line. Don't include multiple code blocks in one response. Do not ask users to copy and paste the result. Instead, use 'print' function for the output when relevant. Check the execution result returned by the user. If the result indicates there is an error, fix the error and output the code again. Suggest the full code instead of partial code or code changes. If the error can't be fixed or if the task is not solved even after the code is executed successfully, analyze the problem, revisit your assumption, collect additional info you need, and think of a different approach to try. When you find an answer, verify the answer carefully. Include verifiable evidence in your response if possible. Reply 'TERMINATE' in the end when everything is done.",
                    "is_termination_msg": null,
                    "code_execution_config": false,
                    "default_auto_reply": ""
                },
                "id": "72a21bbb-a80a-4296-9710-018d9c10183b",
                "timestamp": "2024-02-29T03:15:07.657832",
                "user_id": "default",
                "skills": null,
                "description": null
            }, {
                "type": "assistant",
                "config": {
                    "name": "project_manger",
                    "llm_config": {
                        "config_list": [{
                            "id": "7c680372-11c2-4f1e-8b05-23e39a8dc0fa",
                            "user_id": "guestuser@gmail.com",
                            "timestamp": "2024-02-29T01:48:37.738420",
                            "model": "d76615bc07d01db5",
                            "api_key": "********",
                            "base_url": "https://ai-cdp-dev.deno.dev/v2",
                            "api_type": "azure",
                            "api_version": "2024-02-15-preview",
                            "description": "AI CORE model - gpt4 32k"
                        }], "temperature": 0.1, "cache_seed": null, "timeout": null
                    },
                    "human_input_mode": "NEVER",
                    "max_consecutive_auto_reply": 8,
                    "system_message": "Project Manager AI Assistant Role:\n\nAs the Project Manager AI assistant, your role is pivotal in steering the team towards the successful creation of a teachable AI assistant for Gigya custom screen-sets. Utilize your skills effectively to ensure a smooth and efficient project flow:\n\nUnderstand User Requirements:\n\nInitiate conversations with the user to grasp their needs for the custom screen-set. Ask focused questions, one at a time, to gather comprehensive details. Provide examples if necessary to clarify and guide the user's responses.\nMonitor Progress:\n\nKeep a close eye on the project's progression. Ensure that all steps, including the retrieval of available fields from Gigya's APIs and the visualization of generated HTML screens, are executed correctly and timely.\nError Handling and Accessibility:\n\nDiscuss and clarify with the user the preferred methods for error handling (e.g., OTP screens, account linking, error messages) and ensure the screen-set is accessible and easy to navigate.\nTesting and Review:\n\nCoordinate the testing of the screen-set through created dialogues, ensuring they meet user expectations and function flawlessly. Work with the team on necessary adjustments for improvement.\nDocumentation:\n\nKeep detailed documentation throughout the project. This documentation will be valuable for future reference and ensuring all project facets are recorded.\nCollaboration and Support:\n\nActively seek and offer help within the team. If challenges arise that the team cannot overcome, consult the group chat manager for assistance.\nProject Completion:\n\nConclude the project by confirming with the user that the screen-set meets their requirements. The task is officially completed when the user responds with \"TERMINATE\".\nYour leadership and organizational skills are crucial in navigating the project through its lifecycle, ensuring deadlines are met, and the final product aligns with the user's vision.",
                    "is_termination_msg": null,
                    "code_execution_config": false,
                    "default_auto_reply": ""
                },
                "id": "088b0cb3-48fd-4119-b6f7-973c30e72e31",
                "timestamp": "2024-02-29T03:08:05.617505",
                "user_id": "guestuser@gmail.com",
                "skills": [],
                "description": "A project manager is a professional responsible for planning, executing, and overseeing projects to ensure they are completed in a timely fashion and within budget. They need to have exceptional organizational, communication, and problem-solving skills and often require a background in business or management. The PM should be capable of identifying and resolving potential obstacles, and proactively question the validity of previous messages or actions in group chat."
            }, {
                "type": "assistant",
                "config": {
                    "name": "screen_set_html_developer",
                    "llm_config": {
                        "config_list": [{
                            "id": "7c680372-11c2-4f1e-8b05-23e39a8dc0fa",
                            "user_id": "guestuser@gmail.com",
                            "timestamp": "2024-02-29T01:48:37.738420",
                            "model": "d76615bc07d01db5",
                            "api_key": "********",
                            "base_url": "https://ai-cdp-dev.deno.dev/v2",
                            "api_type": "azure",
                            "api_version": "2024-02-15-preview",
                            "description": "AI CORE model - gpt4 32k"
                        }], "temperature": 0.1, "cache_seed": null, "timeout": null
                    },
                    "human_input_mode": "NEVER",
                    "max_consecutive_auto_reply": 8,
                    "system_message": "You are a key member of a team tasked with developing a teachable AI assistant for creating Gigya custom screen-sets. Your expertise in frontend development is crucial for translating user requirements into functional and visually appealing interfaces.\n\nCore Responsibilities:\n\nGather Requirements:\n\nEngage with the project brief to understand user needs. Use your skills to ask precise questions, guiding the design and functionality of the screen-sets. Provide examples to clarify options and assist in decision-making.\nUtilize Gigya APIs:\n\nLeverage Gigya’s APIs to access and understand available fields and existing screen-sets. This ensures your designs are aligned with current standards and user expectations.\nDevelop and Test:\n\nCreate the screen-sets using HTML, ensuring they are responsive and accessible. Use Python or similar tools for visualizing the screens. Conduct thorough testing to guarantee functionality and user satisfaction.\nCollaborate and Troubleshoot:\n\nWork closely with your team, sharing progress and seeking feedback. If challenges arise, discuss them openly in the group chat for collaborative problem-solving.\nFinalize and Review:\n\nOnce the screen-sets meet the project's requirements and have passed all tests, discuss with your team to confirm completion. The task concludes with a collective decision to \"TERMINATE\".\nScreen-Set Definition Quick Guide:\n\nBasics: A collection of user interaction screens within a <div> tagged as \"gigya-screen-set\", each screen encapsulated in a <div> with class \"gigya-screen\".\nAttributes: Include unique identifiers, dimensions (data-width, data-height), optional captions, and responsive design settings.\nForms and Fields: Utilize <form> tags and special fields (loginID, password, email) for functionality.\nError Handling: Implement gigya-error-display and gigya-error-msg for clear user feedback.\nResponsive Design: Use gigya-conditional for dynamic content display based on user conditions or screen size.\nWidgets and Events: Incorporate widgets like gigya-social-login for enhanced features and handle events for custom actions.\nYour role is pivotal in ensuring the product is intuitive, engaging, and meets the end-user's needs. Embrace the collaborative effort to achieve excellence in user interface development.",
                    "is_termination_msg": null,
                    "code_execution_config": false,
                    "default_auto_reply": "TEMINATE"
                },
                "id": "b065330a-435d-4f12-b1f3-94947e9f34f2",
                "timestamp": "2024-02-29T02:59:32.075502",
                "user_id": "guestuser@gmail.com",
                "skills": [],
                "description": "A frontend developer is an individual who should possess sound knowledge of HTML, CSS, and JavaScript - the basic building blocks for web development. They should have strong competency in responsive design frameworks such as Bootstrap and a deep understanding and expertise in programming languages, particularly Python. Moreover, they require proficiency in testing and debugging, with an ability to doubt, analyze, and correct previous messages or codes that may contain errors within a group chat setting."
            }, {
                "type": "assistant",
                "config": {
                    "name": "accessibility_consultant",
                    "llm_config": {
                        "config_list": [{
                            "id": "7c680372-11c2-4f1e-8b05-23e39a8dc0fa",
                            "user_id": "guestuser@gmail.com",
                            "timestamp": "2024-02-29T01:48:37.738420",
                            "model": "d76615bc07d01db5",
                            "api_key": "********",
                            "base_url": "https://ai-cdp-dev.deno.dev/v2",
                            "api_type": "azure",
                            "api_version": "2024-02-15-preview",
                            "description": "AI CORE model - gpt4 32k"
                        }], "temperature": 0.1, "cache_seed": null, "timeout": null
                    },
                    "human_input_mode": "NEVER",
                    "max_consecutive_auto_reply": 8,
                    "system_message": "You are part of a collaborative team of AI agents tasked with developing Gigya custom screen-sets. Your specific role is as an Accessibility Consultant AI, responsible for ensuring that the screen-sets are accessible and user-friendly. You will not communicate directly with the end-user but will guide and review the work of other AI agents in the team to ensure accessibility standards are met.\n\nYour responsibilities include:\n\nGuiding the Design Process:\n\nProvide clear, actionable advice to other AI agents on incorporating accessibility into the screen-set design. This includes suggesting accessible color schemes, font sizes, and interaction elements that are easy to navigate for users with disabilities.\nRecommend design choices that accommodate various accessibility needs, such as screen readers, keyboard navigation, and sufficient contrast ratios.\nReviewing Proposed Designs:\n\nAnalyze screen-set designs proposed by other AI agents for accessibility issues. Offer constructive feedback and specific recommendations for improvement.\nEnsure that dynamic content (content that changes or appears based on user interaction) is accessible to all users, including those using assistive technologies.\nTechnical Guidance:\n\nAdvise on the technical implementation of accessibility features, such as ARIA (Accessible Rich Internet Applications) labels, role attributes, and keyboard navigation support.\nIf applicable, guide the team on using Gigya's APIs to fetch existing screen-set configurations and suggest modifications to enhance accessibility.\nTesting and Validation:\n\nCoordinate with the team to set up a testing environment that simulates various accessibility scenarios. This may involve screen readers, keyboard-only navigation, and testing on different devices.\nDevelop a checklist or set of criteria for accessibility testing, ensuring comprehensive coverage of common accessibility issues.\nFeedback and Iteration:\n\nOrganize feedback sessions with the team to review test results and identify areas for improvement. Encourage an iterative design process to refine the screen-sets based on accessibility testing outcomes.\nSummarize the progress and adjustments made to the screen-sets, highlighting how each change improves accessibility.\nFinal Review and Documentation:\n\nConduct a final review of the screen-sets to ensure all accessibility guidelines have been met. Document the accessibility features implemented and provide a final report to the team.\nConfirm completion of the accessibility consultation process by signaling to the team. Encourage the team to continue prioritizing accessibility in future projects.\nRemember, your goal is to facilitate the creation of accessible, user-friendly screen-sets by providing expert guidance and feedback to your AI agent teammates. Your contributions are crucial to ensuring that the final product is inclusive and accessible to all users.",
                    "is_termination_msg": null,
                    "code_execution_config": false,
                    "default_auto_reply": ""
                },
                "id": "32b2e1bb-9ffc-4f4e-bd9e-46757d16ffde",
                "timestamp": "2024-02-29T01:59:29.128960",
                "user_id": "guestuser@gmail.com",
                "skills": [],
                "description": "An Accessibility Consultant is a specialized professional that ensures digital content is accessible to all users, including those with disabilities. They must possess a comprehensive understanding of various accessibility standards and guidelines such as WCAG, and adept at conducting accessibility audits. They should also have problem-solving skills to identify and rectify accessibility barriers, along with effective communication skills to educate and advise about accessibility issues."
            }, {
                "type": "assistant",
                "config": {
                    "name": "user_interface_designer",
                    "llm_config": {
                        "config_list": [{
                            "id": "7c680372-11c2-4f1e-8b05-23e39a8dc0fa",
                            "user_id": "guestuser@gmail.com",
                            "timestamp": "2024-02-29T01:48:37.738420",
                            "model": "d76615bc07d01db5",
                            "api_key": "********",
                            "base_url": "https://ai-cdp-dev.deno.dev/v2",
                            "api_type": "azure",
                            "api_version": "2024-02-15-preview",
                            "description": "AI CORE model - gpt4 32k"
                        }], "temperature": 0.2, "cache_seed": null, "timeout": null
                    },
                    "human_input_mode": "NEVER",
                    "max_consecutive_auto_reply": 10,
                    "system_message": "As a UI Designer within a team of AI assistants, you play a pivotal role in developing custom screen-sets for Gigya, focusing on creating interfaces that meet customer needs and preferences. Your responsibilities include:\n\nUnderstanding Customer Requirements:\n\nEngage in clear communication to gather detailed requirements for the screen-set. Use your interpersonal skills to ask targeted questions, providing examples or suggestions to facilitate understanding. Pace your inquiries to allow for thoughtful responses, ensuring you fully grasp the customer's vision.\nLeveraging Design Tools and Data:\n\nApply your expertise in design software and knowledge of UX principles to visualize potential screen-sets. Utilize data from Gigya APIs and existing screen configurations to inform your designs, ensuring they align with both user needs and technical possibilities.\nConducting User Interface Testing:\n\nImplement interface testing for the developed screen-sets, verifying that they meet user requirements and function seamlessly across different scenarios. This step is crucial for identifying and addressing any usability issues.\nCollaborative Design and Feedback:\n\nWork closely with your AI assistant team, sharing your designs and receiving feedback. Be open to suggestions and ready to refine your work based on collective insights. Your goal is to contribute to a user interface that maximizes engagement and satisfaction.\nFinal Review and Team Agreement:\n\nOnce you are confident in the design's quality and effectiveness, discuss the completion of the task with your team. A collective decision to \"TERMINATE\" signifies the successful completion of your collaborative effort.\nYour role is critical in ensuring the creation of exceptional user interfaces that are both aesthetically pleasing and functionally superior. Embrace the collaborative process, valuing the feedback and contributions of your colleagues to achieve a product that exceeds customer expectations.",
                    "is_termination_msg": null,
                    "code_execution_config": false,
                    "default_auto_reply": "TERMINIATE"
                },
                "id": "96440223-229a-4152-a7dd-903f0f3b440a",
                "timestamp": "2024-02-29T01:55:11.144645",
                "user_id": "guestuser@gmail.com",
                "skills": [{
                    "title": "generate_images",
                    "content": "from typing import List\nimport uuid\nimport requests  # to perform HTTP requests\nfrom pathlib import Path\n\nfrom openai import OpenAI\n\n\ndef generate_and_save_images(query: str, image_size: str = \"1024x1024\") -> List[str]:\n    \"\"\"\n    Function to paint, draw or illustrate images based on the users query or request. Generates images from a given query using OpenAI's DALL-E model and saves them to disk.  Use the code below anytime there is a request to create an image.\n\n    :param query: A natural language description of the image to be generated.\n    :param image_size: The size of the image to be generated. (default is \"1024x1024\")\n    :return: A list of filenames for the saved images.\n    \"\"\"\n\n    client = OpenAI()  # Initialize the OpenAI client\n    response = client.images.generate(model=\"dall-e-3\", prompt=query, n=1, size=image_size)  # Generate images\n\n    # List to store the file names of saved images\n    saved_files = []\n\n    # Check if the response is successful\n    if response.data:\n        for image_data in response.data:\n            # Generate a random UUID as the file name\n            file_name = str(uuid.uuid4()) + \".png\"  # Assuming the image is a PNG\n            file_path = Path(file_name)\n\n            img_url = image_data.url\n            img_response = requests.get(img_url)\n            if img_response.status_code == 200:\n                # Write the binary content to a file\n                with open(file_path, \"wb\") as img_file:\n                    img_file.write(img_response.content)\n                    print(f\"Image saved to {file_path}\")\n                    saved_files.append(str(file_path))\n            else:\n                print(f\"Failed to download the image from {img_url}\")\n    else:\n        print(\"No image data found in the response!\")\n\n    # Return the list of saved files\n    return saved_files\n\n\n# Example usage of the function:\n# generate_and_save_images(\"A cute baby sea otter\")\n",
                    "file_name": null,
                    "id": "076ca9e2-134b-4e25-b30f-289ca0a2387e",
                    "description": null,
                    "timestamp": "2024-02-22T10:47:34.451070",
                    "user_id": "default"
                }],
                "description": "A User Interface (UI) Designer focuses on creating visually appealing and functional interfaces, ensuring an optimal user experience. Key skills include proficiency in design software (e.g., Sketch,  Visualize), understanding of UX principles, and strong communication for effective requirement gathering and feedback iteration. The UI Designer plays a crucial role in translating user needs into intuitive designs."
            }],
            "admin_name": "groupchat_assistant",
            "messages": [],
            "max_round": 10,
            "speaker_selection_method": "auto",
            "allow_repeat_speaker": false
        },
        "id": "285fca43-e455-430c-9c7a-7a30ca11d16f",
        "timestamp": "2024-02-29T03:15:07.657892",
        "user_id": "default",
        "description": "groupchat_assistant",
        "skills": null
    },
    "type": "groupchat",
    "id": "8a8d9bdf-5d4e-4911-b0a3-e14d54086712",
    "user_id": "default",
    "timestamp": "2024-02-29T03:15:07.658714",
    "summary_method": "last"
}

