import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Footer(){
    return (
        <footer className='w-full bg-gray-700 text-white py-4'>
          <div className='container mx-auto flex justify-between items-center h-full'>
            <span>© 2023 Gadget Box, Inc. All rights reserved.</span>
            <div className='flex space-x-4'>
                    <FacebookIcon />
                    <TwitterIcon />
                    <LinkedInIcon />
                    <InstagramIcon />
                    <YouTubeIcon />
                    <GitHubIcon />
            </div>
          </div>
        </footer>
      );
}