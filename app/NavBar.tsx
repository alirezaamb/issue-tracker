'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentpath = usePathname();
  const links = [
    { lable: 'Dashboard', href: '/' },
    { lable: 'Issues', href: '/issues' },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <li
              key={link.href}
              className={classNames({
                'text-zinc-900': link.href === currentpath,
                'text-zinc-500': link.href !== currentpath,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              <Link href={link.href}>{link.lable}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
