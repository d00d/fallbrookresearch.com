---
layout: post
title: Dreaming Deeply with Neural Networks
date: 2019-05-29 13:40 -0700
feature-img: white1.jpg
author: R. Dubnick
comments: true
published: true
---
### Deep Dream algorithm and image over-processing

![input.jpg]({{site.baseurl}}/assets/img/blog-cnn/input.jpg)
![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input_color1.jpeg)
![dd-in11.jpeg]({{site.baseurl}}/assets/img/blog-cnn/dd-in11.jpeg)

Increasingly we see more applications for Computer Vision, Facial Recognition, and Speech Recognition.  Growth of rapid linear algebra hardware & software stacks, cloud resources, proliferation of repeatable and shared research have all helped accelerate the evolution of new neural network models.

Neural network models are not new, the first ones arrived in the 1950's.  These Neural Networks are a subfield of machine learning inspired by the structure and function of the brain.  A neural network makes classifications or predictions based on its ability to discover patterns in data.  We might only find simple patterns with one layer however with more than one more complex patterns of patterns could be recognized.  These very useful tools are built upon well-known mathematical methods, we actually understand surprisingly little of why certain models work and others don’t. So let’s take a look at some simple techniques for peeking inside these networks.  Multi-layer neural networks exploit local correlations and they are trained with backpropagation via gradient-based learning algorithm.

Depending on how models are developed this can rely on every area of the natural sciences and has applications in architecture, digital fabrication, art, engineering, biomedicine, etc.  Convolutional neural networks (CNNs)  and have significantly progressed the fields of speech and image classification.  Inspired by nature, this technique resembles how the visual cortex functions in biology amd these CNN's reflect a connectivity pattern similar to what is manifest among neurons in our brains.  This generative progression is a kind of [digital morphogenesis](https://en.wikipedia.org/wiki/Digital_morphogenesis){:target="_blank"} allowing us to synthesize visual textures and recognize patterns.  This technique relfects a kind of digital confirmation bias existing wthin the computational model where emergent patterns depend on the variety of subjects the model was trained with and the layers of the model we filter.


[Deep Dream](https://en.wikipedia.org/wiki/DeepDream){:target="_blank"} is a computer vision program created by Google engineer Alex Mordvintsev which uses a convolutional neural network to find and enhance patterns in images.  The resulting "algorithmic pareidolia" produces facinating images having a dream-like, kind of hallucinogenic appearance.


Artificial neural networks are trained via millions of training examples and gradually adjusting the network parameters until it gives the desired classification.  A network typically consists of 10-30 stacked layers of artificial neurons. Any given image is fed into the input layer, which then talks to the next layer, until eventually the “output” layer is reached. The network’s “answer” comes from its final output layer.

It remains a challenge to understand exactly what is going on at each layer. We know that after training, each layer progressively extracts higher and higher-level features of the image, until the final layer essentially makes a decision on what the image shows. For example, the first layer maybe looks for edges or corners. Intermediate layers interpret the basic features to look for overall shapes or components, like a door or a leaf. The final few layers assemble those into complete interpretations—these neurons activate in response to very complex things such as entire buildings or trees.

### Producing Dreams

![intro0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/intro0.jpg)
![intro1.jpeg]({{site.baseurl}}/assets/img/blog-cnn/intro1.jpg)

Looking at Deep Dream, we have a computer vision program created by Google engineer Alex Mordvintsev that takes advantage of convolutional neural networks to recgonize and augment patterns in images, creating some amazing Dream-like hallucinogenic appearances in the deliberately over-processed images.  The idea is to interpret a vague stimulus as something known to the observer, such as seeing shapes in clouds, seeing faces in inanimate objects or abstract patterns, or hearing hidden messages in music.  Making the "dream" images is a gradient ascent process which seeks maximize the L2 norm of activations of a particular DNN layer. Here are a few simple tricks that we found useful for getting good images:

offset image by a random jitter
normalize the magnitude of gradient ascent steps
apply ascent across multiple scales (octaves)
First we implement a basic gradient ascent step function, applying the first two tricks. Next we implement an ascent through different scales. We call these scales "octaves".  Now we are ready to let the neural network to reveal its dreams! Let's take a our site logo image as a starting point:


Running the next code cell starts the detail generation process. You may see how new patterns start to form, iteration by iteration, octave by octave.
The complexity of the details generated depends on which layer's activations we try to maximize. Higher layers produce complex features, while lower ones enhance edges and textures, giving the image an impressionist feeling.

Neural networks trained to discriminate between different kinds of images have quite a bit of the information required to actually generate images. This is important since we train networks by training them on many examples of what we want them to learn, hoping they extract the essence of the subject matter, and then learn to ignore what doesn’t matter. However in order to know that the network has correctly learned the right features it can help to have it render the network’s visual representation.   This may reveal that the neural net isn’t exactly looking what we thought.  Instead of specifically prescribing the feature we want the network to amplify, we can also allow the network make that decision. In doing so, we would "feed" the network an arbitrary image or photo and allow the network analyze the picture. Then we'll choose a netowrk layer and instruct the network to make enhancements on whatever it has detected.  Each of the network layers has some features with a different level of abstraction, the complexity of features we generate depends on which layer we choose to enhance. We can see for example lower layers tend to produce strokes or simple ornament-like patterns, because those layers are sensitive to basic features such as edges and their orientations.

![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input.jpg)
![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input0.jpeg)
![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input_color1.jpeg)

What if we feed the deepdream function its own output, after applying a little zoom to it? It turns out that this leads to an endless stream of impressions of the things that the network saw during training. Some patterns fire more often than others, suggestive of basins of attraction.

We will start the process from the site logo image as above, but after some iteration the original image becomes irrelevant; even random noise can be used as the starting point.

![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input1.jpeg)
![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input6a.jpeg)
![input0.jpeg]({{site.baseurl}}/assets/img/blog-cnn/input16xxx.jpeg)


If we choose higher-level layers, which identify more sophisticated features in images, complex features or even whole objects tend to emerge. Again, we just start with an existing image and give it to our neural net. We ask the network: “Whatever you see there, I want more of it!” This creates a feedback loop: if a cloud looks a little bit like a bird, the network will make it look more like a bird. This in turn will make the network recognize the bird even more strongly on the next pass and so forth, until a highly detailed bird appears, seemingly out of nowhere.

The results are intriguing—even a relatively simple neural network can be used to over-interpret an image, just like as children we enjoyed watching clouds and interpreting the random shapes. This network was trained mostly on images of animals, so naturally it tends to interpret shapes as animals. But because the data is stored at such a high abstraction, the results are an interesting remix of these learned features.

Of course, we can do more than cloud watching with this technique. We can apply it to any kind of image. The results vary quite a bit with the kind of image, because the features that are entered bias the network towards certain interpretations. For example, horizon lines tend to get filled with towers and pagodas. Rocks and trees turn into buildings. Birds and insects appear in images of leaves.

The original image influences what kind of objects form in the processed image.
This technique gives us a qualitative sense of the level of abstraction that a particular layer has achieved in its understanding of images. We call this technique “Inceptionism” in reference to the neural net architecture used. See our Inceptionism gallery for more pairs of images and their processed results, plus some cool video animations.

### Going Deeper with Iterations

If we apply the algorithm iteratively on its own outputs and apply some zooming after each iteration, we get an endless stream of new impressions, exploring the set of things the network knows about. We can even start this process from a random-noise image, so that the result becomes purely the result of the neural network.  The techniques presented here help us understand and visualize how neural networks are able to do challenging classification tasks, improve network architecture, and check what the network has learned during training. It also makes us wonder whether neural networks could become a tool for artists—a new way to remix visual concepts—or perhaps even shed a little light on the roots of the creative process in general.
