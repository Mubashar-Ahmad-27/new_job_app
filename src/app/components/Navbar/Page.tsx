'use client'
import React, { useState, useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Link } from "@heroui/react";
import Image from 'next/image';

const Nav: React.FC = React.memo(() => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    localStorage.removeItem("user");
  };

  const authButtons = useMemo(() => {
    return !session ? (
      <>
        <NavbarItem className="hidden md:flex">
          <button onClick={() => signIn()} className="bg-yellow-500 text-white font-medium rounded p-2 px-3">
            Login
          </button>
        </NavbarItem>
        <NavbarItem>
          <Link className="bg-blue-700 text-white font-medium rounded p-2" href="/signup">
            Sign Up
          </Link>
        </NavbarItem>
      </>
    ) : (
      <NavbarItem>
        <button onClick={handleLogout} className="bg-red-500 text-white font-medium rounded p-2 px-3">
          Logout
        </button>
      </NavbarItem>
    );
  }, [session]); // Memoized so it only updates when session changes

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black text-white">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand className="cursor-pointer">
          <Link href="/">
            <Image src="/images/logo.jpeg" alt="LOGO" width={80} height={30} />
            <p className="font-bold text-white">HERE</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {session && (
          <NavbarItem>
            <Link className="font-medium text-white" href="/jobPage">
              Jobs
            </Link>
          </NavbarItem>
        )}

        {session?.user.role === "admin" && (
          <NavbarItem>
            <Link className="font-medium text-white" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end">{authButtons}</NavbarContent>
    </Navbar>
  );
});

export default Nav;
