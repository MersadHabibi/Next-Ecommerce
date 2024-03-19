import Logo from "@/components/modules/Logo";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-secondry bg-white pt-5 dark:border-secondry-dark dark:bg-primary-dark">
      <div className="container grid grid-cols-1 gap-y-3 lg:grid-cols-5">
        <div className="pt-3 text-gray-700 dark:text-gray-300 lg:col-span-2">
          <div className="-ml-2 mb-4 h-20">
            <Logo classname="w-24" />
          </div>
          <p className="mb-2 font-medium">mersadhabibi.work@gmail.com</p>
          <p>09148906005</p>
        </div>
        <div className="grid grid-cols-2 gap-y-8 pt-10 sm:grid-cols-4 lg:col-span-3">
          <div>
            <p className="mb-5 text-lg font-medium">Home</p>
            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
              <li>Man</li>
              <li>Women</li>
              <li>Best Sellers</li>
              <li>Category</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-lg font-medium">Company</p>
            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
              <li>About Us</li>
              <li>Gallery</li>
              <li>Reviews</li>
              <li>FAQ`s</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-lg font-medium">Social</p>
            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>X</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-lg font-medium">Suppurt</p>
            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
              <li>Privacy policy</li>
              <li>Terms & conditian</li>
              <li>Help center</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-10 w-full border-t border-secondry py-5 text-center dark:border-secondry-dark">
          <p className="text-gray-700 dark:text-gray-300">
            Copyright &copy;. Designed By{" "}
            <a
              className="font-medium text-blue-500 underline"
              href="https://github.com/MersadHabibi">
              mersad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
