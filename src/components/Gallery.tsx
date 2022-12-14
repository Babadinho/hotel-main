import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Stack,
  Text,
  chakra,
  Link,
  Image,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import { gallery } from '../utils/GalleryData';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MdCollections } from 'react-icons/md';
import CarouselGallery from './CarouselGallery';

const Gallery = () => {
  const buttons = ['all', 'rooms', 'hotel', 'restaurant', 'gym'];
  const [active, setActive] = useState<string>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const animation = useAnimation();

  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.01],
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        ease: 'easeInOut',
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      animation.start('show');
    }
  }, [animation, inView, active]);

  return (
    <>
      <CarouselGallery
        isOpen={isOpen}
        onClose={onClose}
        gallery={gallery}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <Box px={{ base: '0.5rem', md: '5rem', xl: '10rem' }} mb='9rem'>
        <motion.div
          variants={container}
          animate={animation}
          initial='hidden'
          exit='exit'
        >
          <Stack
            align={'center'}
            mx={'auto'}
            maxW={'xxl'}
            w={{ base: 'full', md: '50vw' }}
            mb='3rem'
          >
            <chakra.h2
              fontSize={{ base: '2xl', md: '3xl' }}
              color={'gray.700'}
              fontWeight='bold'
            >
              Some Exclusive Photo Gallery
            </chakra.h2>
            <Text
              fontSize={{ base: '1rem', md: '1rem' }}
              color={'gray.600'}
              align={'center'}
            >
              The hotel's photo gallery showcases stunning images of the
              property's luxurious rooms, amenities, and surroundings.
            </Text>
          </Stack>

          <Box
            mb='2rem'
            px={'2rem'}
            display='flex'
            justifyContent='center'
            flexWrap={'wrap'}
            gap={{ base: '1.5rem', md: '3rem' }}
          >
            {buttons.map((button, i) => {
              return (
                <Link
                  textTransform='uppercase'
                  fontSize='0.87rem'
                  fontWeight='bold'
                  color={active === button ? 'red.600' : 'gray.700'}
                  onClick={() => setActive(button)}
                  key={i}
                  _hover={{
                    textDecoration: 'none',
                    color: 'red.600',
                  }}
                  className='gallery_button'
                  ref={ref}
                >
                  {button}
                </Link>
              );
            })}
          </Box>
          <Box>
            <Grid
              templateColumns={{
                sm: 'repeat(autofill, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={4}
            >
              {gallery.map((g, i) => {
                if (g.category === active || active === 'all') {
                  return (
                    <GridItem w='100%' colSpan={1} key={i}>
                      <motion.div variants={item} layout className='image'>
                        <Image
                          h='300px'
                          w='100%'
                          objectFit='cover'
                          src={g.photo}
                          alt={g.category}
                        />
                        <Box
                          display='flex'
                          justifyContent='center'
                          alignItems='center'
                          className='caption'
                          cursor='pointer'
                          onClick={() => {
                            onOpen();
                            setCurrentSlide(i);
                          }}
                        >
                          {<MdCollections />}
                        </Box>
                      </motion.div>
                    </GridItem>
                  );
                }
              })}
            </Grid>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Gallery;
