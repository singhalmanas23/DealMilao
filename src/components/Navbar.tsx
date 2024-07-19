import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
    return (
      <header className="w-full">
        <nav className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-1">
            <Image 
              src="/assets/icons/logo.svg"
              width={27}
              height={27}
              alt="logo"
            />
            <p className="text-xl font-bold">
              Deal<span className="text-primary">Milao</span>
            </p>
          </Link>
         
        </nav>
      </header>
    )
  }
  
  export default Navbar;
  