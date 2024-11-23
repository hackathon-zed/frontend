import ChatBot from "@/components/shared/ChatBot";
import Container from "@/components/ui/container";

const HelpPage = () => {
  return (
    <Container className="border-1 border-border my-4">
      <h2 className="h2 text-center">Our chatbot is here to help you</h2>

      <ChatBot />
      <p className="p text-center">
        Need for professional help? Contact us at{" "}
        <em className="font-semibold">zed.ai@gmail.com</em>
      </p>
    </Container>
  );
};

export default HelpPage;
