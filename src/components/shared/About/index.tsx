import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaPaintBrush } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100" id="about">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <section className="mb-10 flex items-center justify-center flex-col gap-2">
          <div className="flex items-center justify-center mb-4 text-center">
            <FaPaintBrush className="text-2xl text-gray-800 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              The Art of Mithila
            </h2>
          </div>
          <Image
            src="/art.jpeg"
            alt="Mithila Art"
            height={1000}
            width={1500}
            className="w-1/2 h-auto mx-auto mb-4 rounded-lg shadow-md"
          />
          <p className="p">
            Mithila is famous for <strong>Madhubani paintings</strong>, an
            intricate art form using natural dyes and themes inspired by
            mythology and nature. Traditional marriage art, such as{" "}
            <em>Kohbar</em>, symbolizes prosperity and fertility.
          </p>
          <Link
            href="/about"
            className={`${buttonVariants({ variant: "secondary" })}`}
          >
            Learn More About Mithila
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
