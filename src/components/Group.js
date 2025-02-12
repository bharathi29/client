import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Avatar, 
  Chip, 
  Tooltip,
  Card,
  CardContent,
  Divider,
  IconButton
} from '@mui/material';
import { 
  styled, 
  createTheme, 
  ThemeProvider 
} from '@mui/material/styles';
import CloudIcon from '@mui/icons-material/Cloud';
import SendIcon from '@mui/icons-material/Send';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';

// Theme Options
const themes = {
  // Option 1: Deep Space Theme
  deepSpace: {
    palette: {
      mode: 'dark',
      primary: { main: '#3498db', light: '#5dade2', dark: '#2874a6' },
      secondary: { main: '#e74c3c', light: '#ec7063', dark: '#cb4335' },
      background: {
        default: '#0e1321',  // Deep midnight blue
        paper: '#1a2238'     // Slightly lighter midnight blue
      },
      text: {
        primary: '#ecf0f1',  // Soft white
        secondary: '#bdc3c7'  // Light gray
      }
    }
  },

  // Option 2: Cyberpunk Theme
  cyberpunk: {
    palette: {
      mode: 'dark',
      primary: { main: '#0ff', light: '#0ff', dark: '#0bb' },  // Neon cyan
      secondary: { main: '#f0f', light: '#f6f', dark: '#c0c' },  // Neon magenta
      background: {
        default: '#0a0a1a',  // Deep dark blue-black
        paper: '#111127'     // Slightly lighter dark blue
      },
      text: {
        primary: '#0ff',     // Neon cyan
        secondary: '#f0f'    // Neon magenta
      }
    }
  },

  // Option 3: Elegant Dark Theme
  elegant: {
    palette: {
      mode: 'dark',
      primary: { main: '#6a5acd', light: '#8470ff', dark: '#483d8b' },  // Slate blue
      secondary: { main: '#4b0082', light: '#6a5acd', dark: '#191970' },  // Indigo
      background: {
        default: '#121212',  // Classic dark theme background
        paper: '#1f1f1f'     // Slightly lighter dark background
      },
      text: {
        primary: '#e0e0e0',  // Soft white
        secondary: '#a0a0a0'  // Gray
      }
    }
  },

  // Option 4: Ocean Depths Theme
  oceanDepths: {
    palette: {
      mode: 'dark',
      primary: { main: '#2980b9', light: '#3498db', dark: '#1f6cb0' },  // Deep blue
      secondary: { main: '#16a085', light: '#1abc9c', dark: '#0e8074' },  // Teal
      background: {
        default: '#0c1445',  // Deep navy
        paper: '#122456'     // Slightly lighter navy
      },
      text: {
        primary: '#ecf0f1',  // Soft white
        secondary: '#bdc3c7'  // Light gray
      }
    }
  }
};

// Select a theme (you can change this to any of the above)
const selectedTheme = createTheme(themes.oceanDepths);

// AI Personas as Students with Advanced Cloud Computing Knowledge
export const AI_PERSONAS = [
  {
    id: 'alex_kim',
    name: 'Alex Kim',
    isAI: true,
    expertise: 'Cloud Infrastructure and Scalability',
    background: 'Computer Science senior specializing in distributed systems and cloud architecture',
    personalityTraits: 'analytical, innovative',
    knowledgeLevel: 'advanced',
    interestAreas: [
      'Microservices architecture', 
      'Kubernetes orchestration', 
      'Cloud-native application design'
    ],
    researchInterests: 'Exploring advanced containerization and serverless computing strategies'
  },
  {
    id: 'emma_rodriguez',
    name: 'Emma Rodriguez',
    isAI: true,
    expertise: 'Cloud Security and Compliance',
    background: 'Information Technology graduate student with focus on cloud security frameworks',
    personalityTraits: 'thorough, strategic',
    knowledgeLevel: 'expert-level',
    interestAreas: [
      'Zero-trust security models', 
      'Multi-cloud governance', 
      'Compliance automation'
    ],
    researchInterests: 'Developing comprehensive cloud security frameworks for enterprise environments'
  },
  {
    id: 'raj_patel',
    name: 'Raj Patel',
    isAI: true,
    expertise: 'Cloud Performance and Optimization',
    background: 'Engineering postgraduate specializing in cloud computing and performance engineering',
    personalityTraits: 'detail-oriented, problem-solver',
    knowledgeLevel: 'advanced',
    interestAreas: [
      'Performance benchmarking', 
      'Cost optimization strategies', 
      'Advanced cloud networking'
    ],
    researchInterests: 'Optimizing cloud resource allocation and reducing computational overhead'
  }
];

const Group = () => {
  const location = useLocation();
  const [groupSize, setGroupSize] = useState(location.state?.groupSize || 4);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('Cloud Computing Fundamentals');
  const [humanName, setHumanName] = useState('Participant');
  
  // Retrieve human name
  const retrievedHumanName = localStorage.getItem('userName') || 'Bhar';

  // Modify state management
  const [selectedAIParticipant, setSelectedAIParticipant] = useState(null);

  // Comprehensive cloud computing topics
  const cloudComputingTopics = [
    // Infrastructure and Architecture
    [
      "Serverless architectures are revolutionizing how we deploy and scale applications.",
      "Microservices have become the backbone of modern cloud-native development strategies."
    ],
    [
      "Edge computing is bridging the gap between local processing and cloud resources.",
      "Containerization technologies like Kubernetes are transforming infrastructure management."
    ],
    // Security and Compliance
    [
      "Zero-trust security models are becoming crucial in protecting distributed cloud environments.",
      "Multi-cloud governance is key to maintaining consistent security across different cloud platforms."
    ],
    [
      "Cloud security is no longer just about perimeter defense, but about comprehensive risk management.",
      "Compliance automation is emerging as a critical tool for managing regulatory requirements in cloud ecosystems."
    ],
    // Performance and Optimization
    [
      "Machine learning is driving unprecedented optimization in cloud resource allocation.",
      "Predictive scaling is changing how we think about computational efficiency."
    ],
    [
      "Quantum computing is poised to revolutionize cloud computational capabilities.",
      "Advanced networking technologies are reducing latency in distributed cloud systems."
    ],
    // Emerging Technologies
    [
      "Blockchain is finding innovative applications in creating decentralized cloud infrastructure.",
      "AI-driven cloud management is becoming increasingly sophisticated and autonomous."
    ],
    [
      "Hybrid cloud strategies are providing unprecedented flexibility for enterprise computing.",
      "Green cloud computing is addressing the environmental impact of massive data centers."
    ]
  ];

  // Tracking used responses to prevent repetition
  const usedResponses = new Set();

  // Comprehensive persona-specific response strategies
  const personaResponses = {
    'Alex Kim': {
      // Expanded response categories
      expertise: 'Cloud Infrastructure and Scalability',
      responseCategories: {
        // Extensive response sets for different contexts
        technicalInnovation: [
          "Microservices architecture is revolutionizing how we design scalable systems.",
          "Kubernetes has transformed container orchestration beyond traditional deployment models.",
          "Cloud-native design principles are breaking down monolithic application barriers.",
          "Serverless computing represents a paradigm shift in resource allocation strategies.",
          "Containerization enables unprecedented application portability and consistency.",
          "Edge computing is extending cloud capabilities closer to data generation points.",
          "Distributed systems are redefining computational resilience and fault tolerance.",
          "Infrastructure as Code (IaC) is bringing unprecedented automation to cloud deployments.",
          "Multi-cloud strategies are becoming essential for enterprise-level architectural flexibility.",
          "Microservices enable granular scaling and independent service evolution."
        ],
        performanceOptimization: [
          "Performance bottlenecks often reveal the most fascinating architectural challenges.",
          "Horizontal scaling strategies are key to managing unpredictable computational demands.",
          "Resource allocation algorithms are becoming increasingly intelligent and adaptive.",
          "Caching mechanisms are critical for reducing latency in distributed systems.",
          "Network topology plays a crucial role in minimizing inter-service communication overhead.",
          "Predictive auto-scaling can dramatically improve resource utilization efficiency.",
          "Containerization allows for more granular performance tuning.",
          "Microservice decomposition enables targeted performance improvements.",
          "Load balancing strategies are evolving with machine learning techniques.",
          "Computational efficiency is about smart resource management, not just raw power."
        ],
        securityPerspectives: [
          "Zero-trust architectures are fundamentally reshaping network security paradigms.",
          "Containerization introduces both novel security challenges and innovative protection mechanisms.",
          "Micro-segmentation is becoming crucial in complex cloud environments.",
          "Identity and access management are moving beyond traditional perimeter defenses.",
          "Continuous security monitoring is essential in dynamic cloud infrastructures.",
          "Encryption at rest and in transit is now a baseline expectation.",
          "Immutable infrastructure provides inherent security advantages.",
          "Service mesh technologies are revolutionizing secure service-to-service communication.",
          "Automated security compliance is becoming a critical cloud capability.",
          "Threat detection is increasingly powered by machine learning algorithms."
        ]
      }
    },
    'Emma Rodriguez': {
      expertise: 'Cloud Security and Compliance',
      responseCategories: {
        securityFrameworks: [
          "Multi-cloud security governance requires a holistic, integrated approach.",
          "Compliance is not just a checkbox, but a continuous risk management process.",
          "Zero-trust models are becoming the gold standard in modern security architectures.",
          "Data sovereignty introduces complex challenges in global cloud deployments.",
          "Security must be designed into systems, not added as an afterthought.",
          "Regulatory compliance is driving significant cloud security innovations.",
          "Identity management is the new perimeter in cloud security.",
          "Automated compliance checks are transforming risk management.",
          "Encryption strategies must evolve with emerging computational capabilities.",
          "Security is a shared responsibility between cloud providers and users."
        ],
        complianceChallenges: [
          "GDPR and CCPA are reshaping how we think about data protection.",
          "Industry-specific compliance requirements demand flexible cloud architectures.",
          "Risk assessment is becoming increasingly data-driven and predictive.",
          "Cloud security certifications are evolving to address emerging threats.",
          "Audit trails and logging are critical for comprehensive security strategies.",
          "Cross-border data regulations create complex architectural challenges.",
          "Security frameworks must balance protection with operational flexibility.",
          "Continuous compliance monitoring is becoming a technological necessity.",
          "Cloud security is about managing risk, not eliminating it completely.",
          "Regulatory technology (RegTech) is transforming compliance approaches."
        ],
        innovativeSecurity: [
          "AI and machine learning are revolutionizing threat detection capabilities.",
          "Blockchain technologies are introducing new security paradigms.",
          "Quantum computing will fundamentally transform cryptographic strategies.",
          "Biometric and behavioral authentication are advancing rapidly.",
          "Decentralized identity solutions are challenging traditional authentication models.",
          "Security is becoming more predictive and proactive.",
          "Automated threat hunting is changing cybersecurity landscapes.",
          "Cloud security is increasingly about intelligent, adaptive protection.",
          "Containerization introduces both challenges and innovations in security.",
          "Machine learning is enabling more sophisticated anomaly detection."
        ]
      }
    },
    'Raj Patel': {
      expertise: 'Cloud Performance and Cost Optimization',
      responseCategories: {
        costEfficiency: [
          "Serverless architectures can dramatically reduce unnecessary infrastructure costs.",
          "Spot instances offer innovative ways to optimize cloud expenditure.",
          "Resource right-sizing is more art than science in cloud economics.",
          "Predictive cost modeling is becoming increasingly sophisticated.",
          "Multi-cloud strategies can provide significant cost arbitrage opportunities.",
          "Container orchestration enables more granular resource allocation.",
          "Cloud cost management is about understanding usage patterns.",
          "Automated scaling can prevent both over-provisioning and performance bottlenecks.",
          "Total cost of ownership goes far beyond simple infrastructure expenses.",
          "Cloud financial management requires continuous optimization strategies."
        ],
        performanceEngineering: [
          "Performance is about intelligent resource allocation, not just raw computational power.",
          "Microservices enable targeted performance improvements and isolation.",
          "Caching strategies are critical in reducing computational overhead.",
          "Network topology significantly impacts distributed system performance.",
          "Computational efficiency requires understanding workload characteristics.",
          "Performance testing must simulate real-world complex scenarios.",
          "Horizontal scaling is not always the most efficient solution.",
          "Latency optimization requires a holistic system approach.",
          "Performance metrics must align with business objectives.",
          "Modern performance engineering is data-driven and predictive."
        ],
        technologicalTrends: [
          "Edge computing is redefining performance boundaries.",
          "Machine learning is transforming performance prediction and optimization.",
          "Quantum computing will revolutionize computational efficiency.",
          "5G and advanced networking are enabling new performance paradigms.",
          "Containerization allows unprecedented computational flexibility.",
          "Distributed computing models are becoming increasingly sophisticated.",
          "Performance optimization is a continuous, adaptive process.",
          "Cloud-native technologies are changing how we think about computational resources.",
          "Artificial intelligence is becoming crucial in resource management.",
          "The future of performance is about intelligent, adaptive systems."
        ]
      }
    }
  };

  // Advanced contextual response generation with unique responses
  const generateAdvancedResponse = (userMessage, participant) => {
    // Sentiment and intent analysis
    const sentimentAnalysis = {
      positive: ['great', 'awesome', 'excellent', 'good', 'interesting', 'cool', 'amazing', 'exciting'],
      negative: ['bad', 'terrible', 'horrible', 'difficult', 'complex', 'challenging', 'problem', 'issue'],
      neutral: ['okay', 'fine', 'alright', 'neutral', 'standard']
    };

    // Keyword mappings for response category selection
    const categoryKeywords = {
      technicalInnovation: ['innovation', 'technology', 'new', 'advanced', 'cutting-edge', 'future'],
      performanceOptimization: ['performance', 'speed', 'optimize', 'faster', 'efficient'],
      securityPerspectives: ['security', 'protect', 'safe', 'risk', 'threat', 'defense'],
      securityFrameworks: ['framework', 'compliance', 'regulation', 'policy', 'governance'],
      complianceChallenges: ['legal', 'rule', 'standard', 'audit', 'check', 'verify'],
      innovativeSecurity: ['AI', 'machine learning', 'blockchain', 'quantum', 'advanced'],
      costEfficiency: ['cost', 'money', 'save', 'expense', 'budget', 'pricing'],
      performanceEngineering: ['engineering', 'design', 'architecture', 'system', 'structure'],
      technologicalTrends: ['trend', 'future', 'emerging', 'next', 'upcoming']
    };

    // Determine response category based on message keywords
    const determineResponseCategory = (message) => {
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
          return category;
        }
      }
      return null;
    };

    // Determine sentiment
    const isPositive = sentimentAnalysis.positive.some(word => 
      userMessage.toLowerCase().includes(word)
    );
    const isNegative = sentimentAnalysis.negative.some(word => 
      userMessage.toLowerCase().includes(word)
    );

    // Select response type based on sentiment
    const sentimentType = isPositive ? 'positive' : (isNegative ? 'negative' : 'neutral');

    // Determine specific response category
    const specificCategory = determineResponseCategory(userMessage);

    // Get persona's response categories
    const personCategories = personaResponses[participant.name].responseCategories;

    // Fallback to random category if no specific match
    const selectedCategory = specificCategory 
      ? specificCategory 
      : Object.keys(personCategories)[Math.floor(Math.random() * Object.keys(personCategories).length)];

    // Get responses for the selected category
    const categoryResponses = personCategories[selectedCategory] || [];

    // Filter out used responses
    const availableResponses = categoryResponses.filter(
      response => !usedResponses.has(`${participant.name}_${response}`)
    );

    // If no unique responses remain, reset for this participant
    if (availableResponses.length === 0) {
      usedResponses.forEach(response => {
        if (response.startsWith(`${participant.name}_`)) {
          usedResponses.delete(response);
        }
      });
      return categoryResponses[0];
    }

    // Select a unique response
    const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
  
    // Mark the response as used
    usedResponses.add(`${participant.name}_${selectedResponse}`);

    return selectedResponse;
  };

  // Question-specific response generation
  const generateQuestionResponse = (userMessage) => {
    // Predefined question-answer pairs for cloud computing
    const questionResponses = [
      {
        patterns: ['what is cloud computing', 'define cloud computing'],
        responses: [
          "Cloud computing is a technology that allows accessing and storing data and programs over the internet instead of your computer's hard drive. It provides scalable, on-demand computational resources.",
          "Cloud computing is a model of delivering computing services—including servers, storage, databases, networking, software—over the internet, offering flexible, efficient, and cost-effective solutions."
        ]
      },
      {
        patterns: ['how does cloud computing work', 'how do clouds work'],
        responses: [
          "Cloud computing works by using remote servers hosted on the internet to store, manage, and process data, instead of using a local server or personal computer.",
          "Essentially, cloud computing relies on shared pools of configurable computing resources, which can be rapidly provisioned with minimal management effort."
        ]
      },
      {
        patterns: ['what are the types of cloud computing', 'cloud computing types'],
        responses: [
          "The main types of cloud computing are: Public Cloud (shared resources), Private Cloud (dedicated to a single organization), and Hybrid Cloud (combination of public and private).",
          "Cloud computing types include Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS), each offering different levels of managed services."
        ]
      },
      {
        patterns: ['what are the benefits of cloud computing', 'why use cloud computing'],
        responses: [
          "Key benefits include cost savings, scalability, flexibility, automatic software updates, and the ability to work from anywhere with internet access.",
          "Cloud computing offers enhanced collaboration, disaster recovery, competitive edge, and the ability to quickly scale resources up or down based on business needs."
        ]
      },
      {
        patterns: ['is cloud computing secure', 'cloud security'],
        responses: [
          "Cloud computing has robust security measures, including encryption, access controls, and regular security audits. However, security depends on both the provider and user practices.",
          "Modern cloud platforms implement advanced security technologies like zero-trust architecture, multi-factor authentication, and continuous monitoring to protect data."
        ]
      }
    ];

    // Check if the message is a question
    const isQuestion = userMessage.trim().endsWith('?') || 
      /^(what|how|why|where|when|which)\s/i.test(userMessage.trim());

    // If it's a question, try to find a matching response
    if (isQuestion) {
      const matchedQuestion = questionResponses.find(q => 
        q.patterns.some(pattern => 
          userMessage.toLowerCase().includes(pattern)
        )
      );

      if (matchedQuestion) {
        return matchedQuestion.responses[Math.floor(Math.random() * matchedQuestion.responses.length)];
      }
    }

    // Fallback to previous context-aware response if not a specific question
    return generateContextualResponse(userMessage);
  };

  // Context-aware response generation
  const generateContextualResponse = (userMessage) => {
    // Keyword-based response mapping
    const contextualResponses = [
      {
        keywords: ['security', 'protect', 'breach', 'safe', 'risk'],
        responses: [
          "Security is indeed a critical aspect of cloud computing. Zero-trust architectures are revolutionizing how we approach data protection.",
          "Implementing robust security measures is paramount in today's distributed cloud environments. Multi-layered defense strategies are becoming essential.",
          "Cloud security has evolved beyond traditional perimeter defenses to more comprehensive risk management approaches."
        ]
      },
      {
        keywords: ['performance', 'speed', 'optimize', 'faster', 'efficient'],
        responses: [
          "Performance optimization in cloud computing is all about intelligent resource allocation and advanced caching strategies.",
          "Microservices and containerization are key to achieving unprecedented computational efficiency in cloud architectures.",
          "Modern cloud platforms are continuously improving performance through machine learning-driven resource management."
        ]
      },
      {
        keywords: ['cost', 'expensive', 'pricing', 'budget', 'save'],
        responses: [
          "Cloud cost optimization is a critical challenge. Predictive scaling and right-sizing can significantly reduce unnecessary expenses.",
          "Serverless architectures and spot instances offer innovative ways to minimize cloud computing costs without compromising performance.",
          "Advanced cloud governance tools now provide granular insights into resource utilization and potential cost savings."
        ]
      },
      {
        keywords: ['scale', 'grow', 'expand', 'large', 'multiple'],
        responses: [
          "Scalability is where cloud computing truly shines. Kubernetes and containerization make horizontal scaling almost seamless.",
          "Modern cloud architectures are designed to handle massive, unpredictable workloads with incredible flexibility.",
          "Edge computing and distributed systems are extending scalability beyond traditional cloud boundaries."
        ]
      },
      {
        keywords: ['machine learning', 'ai', 'intelligent', 'smart', 'learn'],
        responses: [
          "Machine learning is transforming cloud computing, enabling predictive resource allocation and intelligent system management.",
          "AI-driven cloud services are creating more adaptive and self-optimizing infrastructure solutions.",
          "The convergence of cloud computing and machine learning is opening up unprecedented computational possibilities."
        ]
      }
    ];

    // Default fallback responses
    const defaultResponses = [
      "That's an intriguing perspective on cloud computing. The field is constantly evolving with new technologies.",
      "Your observation highlights the complex and dynamic nature of cloud technologies.",
      "Cloud computing continues to surprise us with its innovative approaches to computational challenges."
    ];

    // Find matching context
    const matchedContext = contextualResponses.find(context => 
      context.keywords.some(keyword => 
        userMessage.toLowerCase().includes(keyword)
      )
    );

    // Select response
    if (matchedContext) {
      return matchedContext.responses[Math.floor(Math.random() * matchedContext.responses.length)];
    }

    // Fallback to default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Generate human-like two-sentence responses
  const generateCloudComputingResponse = (userMessage) => {
    // Filter out used response pairs
    const availableTopics = cloudComputingTopics.filter(
      topic => !usedResponses.has(topic[0] + topic[1])
    );

    // If all topics have been used, reset the used responses
    if (availableTopics.length === 0) {
      usedResponses.clear();
      return cloudComputingTopics[0];
    }

    // Select a random topic pair
    const selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
    
    // Mark the response as used
    usedResponses.add(selectedTopic[0] + selectedTopic[1]);

    return selectedTopic;
  };

  // Generate AI participants
  const generateParticipants = () => {
    // Coordinator persona
    const coordinatorPerson = {
      id: 'coordinator',
      name: 'Dr. Sarah Thompson',
      isCoordinator: true,
      expertise: 'Cloud Computing Expert',
      background: 'Renowned researcher and professor in cloud technologies'
    };

    // Human participant
    const humanParticipant = {
      id: 'human',
      name: retrievedHumanName,
      isAI: false,
      isHuman: true
    };

    // Combine all participants
    const allParticipants = [
      coordinatorPerson,
      humanParticipant,
      ...AI_PERSONAS
    ];

    // Set participants in state
    setParticipants(allParticipants);
  };

  // Trigger participant generation on component mount
  useEffect(() => {
    generateParticipants();
  }, []);

  // Automatically select first AI participant when participants are generated
  useEffect(() => {
    if (participants.length > 0) {
      const aiParticipants = participants.filter(p => p.isAI);
      if (aiParticipants.length > 0 && !selectedAIParticipant) {
        handleParticipantSelect(aiParticipants[0]);
      }
    }
  }, [participants]);

  // Handle participant selection
  const handleParticipantSelect = (participant) => {
    // Ensure the participant is an AI participant
    if (participant.isAI) {
      // Set the selected AI participant
      setSelectedAIParticipant(participant);

      // Coordinator's opening statement
      const coordinatorIntro = `Welcome to our advanced Cloud Computing discussion! 
      I'm Dr. Sarah Thompson, and today we'll explore cutting-edge cloud technologies 
      with a group of highly knowledgeable student researchers.

      Our participants today are:
      - Coordinator: Dr. Sarah Thompson (Cloud Computing Expert)
      - Main Participant: ${humanName}
      ${participants
        .filter(p => p.isAI)
        .map(p => `- ${p.name} (Advanced Cloud Computing Researcher)`)
        .join('\n')}

      Today, we'll engage in a sophisticated dialogue, examining complex cloud computing 
      concepts, emerging technologies, and innovative research perspectives. 
      Our student participants bring deep technical insights and forward-thinking approaches.

      Let's begin by hearing ${humanName}'s thoughts on the evolving landscape of cloud technologies! 🌐🚀`;

      // Initial discussion message
      const initialMessage = {
        sender: 'Dr. Sarah Thompson',
        content: coordinatorIntro,
        type: 'system',
        timestamp: new Date().toLocaleTimeString()
      };

      // Reset messages and add initial message
      setMessages([initialMessage]);
    }
  };

  // Send message handler
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Human's message
    const userMessage = {
      sender: retrievedHumanName,
      content: newMessage,
      type: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    // Add human's message
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Get all AI participants
    const aiParticipants = participants.filter(p => p.isAI);

    // Generate and add AI responses with delay
    aiParticipants.forEach((participant, index) => {
      setTimeout(() => {
        // Generate unique response for this specific participant
        const responseContent = generateAdvancedResponse(newMessage, participant);

        const aiResponse = {
          sender: participant.name,
          content: responseContent,
          type: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };

        // Add each AI response with a delay
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 3000 * (index + 1)); // Stagger responses by 3 seconds
    });

    // Clear input
    setNewMessage('');
  };

  // Render method
  return (
    <ThemeProvider theme={selectedTheme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Participants Selection Area */}
        <Box sx={{ 
          backgroundColor: 'rgba(0,0,0,0.1)', 
          p: 2, 
          textAlign: 'center' 
        }}>
          <Typography variant="h6" gutterBottom>
            Select an AI Participant to Start Discussion
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2,
            flexWrap: 'wrap'
          }}>
            {console.log('Participants:', participants)}
            {participants
              .filter(p => p.isAI)
              .map((participant) => (
                <Chip 
                  key={participant.id}
                  label={`${participant.name} (${participant.expertise})`}
                  onClick={() => handleParticipantSelect(participant)}
                  color={selectedAIParticipant?.id === participant.id ? 'primary' : 'secondary'}
                  sx={{ 
                    fontSize: '1rem', 
                    padding: '10px',
                    cursor: 'pointer',
                    margin: '5px'
                  }}
                />
              ))
            }
          </Box>
        </Box>

        {/* Messages Area */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          p: 2 
        }}>
          {messages.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center">
              {selectedAIParticipant 
                ? "Waiting to start the discussion..." 
                : "Please select an AI participant to begin"}
            </Typography>
          )}
          {messages.map((message, index) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 2,
                backgroundColor: 
                  message.type === 'system' ? 'rgba(0,0,0,0.1)' : 
                  'transparent',
                p: 1,
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle1" color="textPrimary">
                {message.sender}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {message.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {message.timestamp}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Message Input */}
        <Box sx={{ 
          p: 2, 
          backgroundColor: 'background.default' 
        }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => {
              console.log('Typing:', e.target.value); // Debug logging
              setNewMessage(e.target.value);
            }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={
              selectedAIParticipant 
                ? `What would you like to discuss with ${selectedAIParticipant.name}?`
                : "Select an AI participant to start discussing"
            }
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'yellow',
                '& fieldset': {
                  borderColor: 'orange'
                }
              },
              '& .MuiInputBase-input': {
                color: 'black',
                backgroundColor: 'yellow'
              }
            }}
            InputProps={{
              style: {
                backgroundColor: 'yellow',
                color: 'black'
              },
              endAdornment: (
                <IconButton onClick={sendMessage} disabled={!selectedAIParticipant}>
                  <SendIcon />
                </IconButton>
              )
            }}
            inputProps={{
              style: {
                color: 'black',
                backgroundColor: 'yellow'
              }
            }}
            disabled={!selectedAIParticipant}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Group;
