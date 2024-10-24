import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialsData = [
  {
    text: "DishDash has changed the way I cook. So many easy-to-follow recipes!",
    name: "Smangele Zwane",
  },
  {
    text: "The variety is amazing, and I love the healthy options.",
    name: "John Smith",
  },
  {
    text: "My go-to app for quick and delicious meals!",
    name: "Sarah Lee",
  },
  {
    text: "I love how I can find recipes based on the ingredients I already have!",
    name: "Linda Baker",
  },
  {
    text: "A fantastic app with great recipes that help me cook healthy meals.",
    name: "Chris Johnson",
  },
  {
    text: "So convenient! I’ve discovered so many new favorite dishes.",
    name: "Mandla Nkosi",
  },
  {
    text: "DishDash has changed the way I cook! Highly recommended!",
    name: "Jane Doe",
  },
  {
    text: "An amazing collection of recipes at my fingertips.",
    name: "John Smith",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one review at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="py-12 my-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Don’t just take our word for it
      </h2>
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 mx-8 text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <p className="text-xl italic text-gray-800 mb-6">
                “{testimonial.text}”
              </p>
              <h4 className="text-lg font-bold text-gray-800">
                {testimonial.name}
              </h4>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
