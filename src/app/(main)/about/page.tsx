import Image from "next/image";
import {
  FaBook,
  FaHatCowboy,
  FaPaintBrush,
  FaSun,
  FaUtensils,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Art Section */}
          <section className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="flex items-center justify-center mb-4 text-center">
              <FaPaintBrush className="text-2xl text-gray-800 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                The Art of Mithila
              </h2>
            </div>
            <div className="flex flex-col h-full">
              <Image
                src="/art.jpeg"
                alt="Mithila Art"
                height={1000}
                width={1500}
                className="w-full h-auto mb-4 rounded-lg shadow-md"
              />
              <p className="text-gray-700 flex-grow">
                Mithila is famous for <strong>Madhubani paintings</strong>, an
                intricate art form using natural dyes and themes inspired by
                mythology and nature. Traditional marriage art, such as{" "}
                <em>Kohbar</em>, symbolizes prosperity and fertility.
              </p>
            </div>
          </section>

          {/* Festivals Section */}
          <section className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="flex items-center justify-center mb-4 text-center">
              <FaSun className="text-2xl text-gray-800 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                Festivals and Celebrations
              </h2>
            </div>
            <div className="flex flex-col h-full">
              <Image
                src="/art.jpeg"
                alt="Mithila Art"
                height={1000}
                width={1500}
                className="w-full h-auto mb-4 rounded-lg shadow-md"
              />
              <p className="text-gray-700 flex-grow">
                Mithila&apos;s festivals, like <strong>Chhath Puja</strong> and{" "}
                <strong>Vivaha Panchami</strong>, blend spirituality and joy.
                These celebrations pay homage to the Sun God and the divine
                wedding of Lord Rama and Goddess Sita.
              </p>
            </div>
          </section>

          {/* Language Section */}
          <section className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="flex items-center justify-center mb-4 text-center">
              <FaBook className="text-2xl text-gray-800 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                Language and Literature
              </h2>
            </div>
            <div className="flex flex-col h-full">
              <Image
                src="/art.jpeg"
                alt="Mithila Art"
                height={1000}
                width={1500}
                className="w-full h-auto mb-4 rounded-lg shadow-md"
              />
              <p className="text-gray-700 flex-grow">
                The <strong>Maithili language</strong>, rich in poetry and
                prose, is central to Mithila&apos;s identity. Legendary poets
                like Vidyapati brought it global recognition.
              </p>
            </div>
          </section>

          {/* Cuisine Section */}
          <section className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="flex items-center justify-center mb-4 text-center">
              <FaUtensils className="text-2xl text-gray-800 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Cuisine</h2>
            </div>
            <div className="flex flex-col h-full">
              <Image
                src="/art.jpeg"
                alt="Mithila Art"
                height={1000}
                width={1500}
                className="w-full h-auto mb-4 rounded-lg shadow-md"
              />
              <p className="text-gray-700 flex-grow">
                Mithila&apos;s cuisine includes delicacies like{" "}
                <strong>Litti Chokha</strong>, <strong>Thekua</strong>, and{" "}
                <strong>Pidakia</strong>. These dishes are celebrated for their
                simplicity and flavor, often prepared during festivals and
                special occasions.
              </p>
            </div>
          </section>

          {/* Traditions Section */}
          <section className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="flex items-center justify-center mb-4 text-center">
              <FaHatCowboy className="text-2xl text-gray-800 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                Unique Traditions
              </h2>
            </div>
            <div className="flex flex-col h-full">
              <Image
                src="/art.jpeg"
                alt="Mithila Art"
                height={1000}
                width={1500}
                className="w-full h-auto mb-4 rounded-lg shadow-md"
              />
              <p className="text-gray-700 flex-grow">
                Iconic headgear like <em>Paag</em> represents honor in Mithila,
                while folk dances like <strong>Jhijhiya</strong> and{" "}
                <strong>Domkach</strong> bring communities together during
                celebrations.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
