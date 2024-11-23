import Image from "next/image";
import {
  FaPaintBrush,
  FaSun,
  FaBook,
  FaUtensils,
  FaHatCowboy,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-6">
        {/* Art Section */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaPaintBrush className="text-2xl text-gray-800 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              The Art of Mithila
            </h2>
          </div>
          <Image
            src="/art-image.jpg"
            alt="Mithila Art"
            height={1000}
            width={1500}
            className="w-full h-auto mb-4 rounded-lg shadow-md"
          />
          <p className="text-gray-700">
            Mithila is famous for <strong>Madhubani paintings</strong>, an
            intricate art form using natural dyes and themes inspired by
            mythology and nature. Traditional marriage art, such as{" "}
            <em>Kohbar</em>, symbolizes prosperity and fertility.
          </p>
        </section>

        {/* Festivals Section */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaSun className="text-2xl text-gray-800 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Festivals and Celebrations
            </h2>
          </div>
          <Image
            src="/art-image.jpg"
            alt="Mithila Art"
            height={1000}
            width={1500}
            className="w-full h-auto mb-4 rounded-lg shadow-md"
          />
          <p className="text-gray-700">
            Mithila&apos;s festivals, like <strong>Chhath Puja</strong> and{" "}
            <strong>Vivaha Panchami</strong>, blend spirituality and joy. These
            celebrations pay homage to the Sun God and the divine wedding of
            Lord Rama and Goddess Sita.
          </p>
        </section>

        {/* Language Section */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaBook className="text-2xl text-gray-800 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Language and Literature
            </h2>
          </div>
          <Image
            src="/art-image.jpg"
            alt="Mithila Art"
            height={1000}
            width={1500}
            className="w-full h-auto mb-4 rounded-lg shadow-md"
          />
          <p className="text-gray-700">
            The <strong>Maithili language</strong>, rich in poetry and prose, is
            central to Mithila&apos;s identity. Legendary poets like Vidyapati
            brought it global recognition.
          </p>
        </section>

        {/* Cuisine Section */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaUtensils className="text-2xl text-gray-800 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Cuisine</h2>
          </div>
          <Image
            src="/art-image.jpg"
            alt="Mithila Art"
            height={1000}
            width={1500}
            className="w-full h-auto mb-4 rounded-lg shadow-md"
          />
          <p className="text-gray-700">
            Mithila&apos;s cuisine includes delicacies like{" "}
            <strong>Litti Chokha</strong>, <strong>Thekua</strong>, and{" "}
            <strong>Pidakia</strong>. These dishes are celebrated for their
            simplicity and flavor, often prepared during festivals and special
            occasions.
          </p>
        </section>

        {/* Traditions Section */}
        <section>
          <div className="flex items-center mb-4">
            <FaHatCowboy className="text-2xl text-gray-800 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Unique Traditions
            </h2>
          </div>
          <Image
            src="/art-image.jpg"
            alt="Mithila Art"
            height={1000}
            width={1500}
            className="w-full h-auto mb-4 rounded-lg shadow-md"
          />
          <p className="text-gray-700">
            Iconic headgear like <em>Paag</em> represents honor in Mithila,
            while folk dances like <strong>Jhijhiya</strong> and{" "}
            <strong>Domkach</strong> bring communities together during
            celebrations.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
