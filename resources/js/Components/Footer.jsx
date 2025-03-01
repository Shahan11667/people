export default function Footer({ laravelVersion, phpVersion }) {
    return (
        <footer className="mt-12 text-gray-300 text-sm">
            Built with ❤️ using Laravel {laravelVersion} & PHP {phpVersion}
        </footer>
    );
}
