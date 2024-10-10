'use client';

import { NAVIGATION } from "@/types/Navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    isOpen && (
      <div className="absolute top-20 left-0 w-full bg-[#000000b6] border-[#9DCE34] border-[1px] backdrop-blur-sm border-t-2 border-[#ffffff53] md:hidden">
        <nav>
          <ul className="flex flex-col items-center py-6">
            {NAVIGATION.map((nav) => (
              <li key={nav.name} className="py-4 flex items-center">
                <Link
                  href={nav.href}
                  onClick={onClose}
                  className={`flex items-center ${
                    pathname === nav.href ? "text-[#9DCE34]" : "text-white"
                  }`}
                >
                  {nav.name}
                  {pathname === nav.href && (
                    <Image
                      src="/next_rick-n-morty/images/morty.svg"
                      alt="Morty"
                      width={32}
                      height={32}
                      className="ml-2"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  );
};

