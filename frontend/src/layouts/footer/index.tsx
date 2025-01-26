import { Flex, List } from '@chakra-ui/react';
import TUWLogo from '../../assets/tuw-1.jpg';
import styles from "./styles/footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Flex
				zIndex='3'
				flexDirection={{
					base: 'column',
					xl: 'row'
				}}
				alignItems={{
					base: 'center',
					xl: 'start'
				}}
				justifyContent='space-between'
				px={{ base: '30px', md: '50px' }}
				pb='30px'>
				<div className='flex '>
                    <img src={TUWLogo} className='h-8 w-auto'/>
					<p className='text-placeholderText text-center xl:text-start mb-[20px] xl:mb-[0px] flex'>
						{' '}
						Denki@TUW &copy; {new Date().getFullYear()}
					</p>
					
				</div>

				<List display='flex' style={{
					maxWidth: "95vw",
					marginLeft: "auto",
					marginRight: "auto",
					flexWrap: "wrap",
					justifyContent: "center"
				}}>
				</List>
			</Flex>
		</footer>
	);
}

export default Footer;