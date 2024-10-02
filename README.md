# Remotion template for the video

## How to use

Clone this repo.

remove origin repo and add your own with the following command

`git remote remove origin`

Create a repo on github for your video.

Then:

`git remote add origin ...` the new repo url.
You can find this command when you created a new blank repo. 

Install: `pnpm i`

Start Remotion studio: `pnpm run start`.

When you push you'll have to set the upstream

git: `git add .`
`git commit -m "add: template ..." `
`git push -u origin main`

## Naming scheme

**T0029** - template name

name your repo TemplateNumber-template
example: template 29 would be "29-template"

## Example root props

```ts
const props: VideoProps = {
  colors: {
    primary: '#070707',
    primaryText: '#fcfcfc',
    secondary: '#3b3a3a',
    secondaryText: '#fcfcfc',
    accent: '#251b16',
    accentText: '#fcfcfc',
    background: '#3b3a3a',
    backgroundText: '#fcfcfc',
    black: '#070707',
    white: '#fcfcfc',
  },
  fonts: {
    primary: 'Poppins',
    secondary: 'Roboto',
  },
  music: staticFile('/music/29.mp3'),
  roundness: 1,
  // See 'Backgrounds' section below
  background: {
    type: 'squares',
    background: 'primary',
  },
  transitionDuration: 30,
  scene1Duration: 150,
  scene1Props: {
    logo: staticFile('Logo.png'),
    audio: staticFile('VO_1.mp3'),
    title: 'Vertex',
    subtitle: 'Financial Services',
    text: 'Where Accuracy Meets Expertise',
  },
  scene2Duration: 180,
  scene2Props: {
    logo: staticFile('Logo.png'),
    img: staticFile('Media_1.jpg'),
    audio: staticFile('VO_2.mp3'),
  },
  ...
};
```

## Scenes

Your work will be mainly in the Scenes files. 
There you can create the video with remotion

## Consts

We have WIDTH & HEIGHT instead of using the useVideoConfig()


### Backgrounds

You can define a new background like this:

```tsx
export const ImageBackground = defineBackground({
  type: 'image',
  description: 'Just a background image',
  schema: z.object({
    background: Color,
    image: ImageProps,
  }),
  component: ({ style, background, image }) => {
    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: colorVar(background), ...style }}>
        <Img src={image} style={{ width: '100%', height: '100%' }} />
      </AbsoluteFill>
    );
  },
});
```

and then reference the ImageBackground in [background/index.ts](src/backgrounds/index.ts)

```ts
export const BACKGROUNDS = [
  // Added ImageBackground here
  ImageBackground,
];
```

now your background is available in VideoProps

```ts
const props = {
    ...,
    background: {
        type: 'image',
        background: 'primary',
        image: { src: 'https://...' }
  },
}

```
or 
```ts
    background: {
        type: 'static',
        background: 'background',
  },
```
for a background with color "background"

Backgrounds should be standalone components.

Meaning we could swap into any other Composition.

### Colors

We have the following structure for colors:

```ts
const colors = {
  primary: '#070707',
  primaryText: '#fcfcfc',
  secondary: '#3b3a3a',
  secondaryText: '#fcfcfc',
  accent: '#251b16',
  accentText: '#fcfcfc',
  background: '#3b3a3a',
  backgroundText: '#fcfcfc',
  black: '#070707',
  white: '#fcfcfc',
};
```

Make sure to use the primary and secondary colors first. 
Same for primaryText and secondaryText.

You will have to adjust the colors to suit your video of course.

You can use these colors with using `colorVar` function, so to get primary color you would use `colorVar('primary')`. 

### Fonts

For fonts we have two fonts: `primary` and `secondary`. Primary font is applied to every text, so no need to apply that separately, but you can use secondary font with `fontVar('secondary')`.

We support 100 most popular Google fonts right now (see [fontFamily.ts](/src/lib/fontFamily.ts))

fontFamily is an output of the useTextSplitter() hook. 
example: fontFamily: var(--font-primary)

## Text splitter

Many text animations need to know where the line breaks are and we also need to make sure that the text won't overflow. So for that we have `useTextSplitter` hook.

```ts
const text = useTextSplitter({
  text: props.text,
  fontSize: 160,
  fontWeight: 'bold',
  maxLines: 2,
  maxWidth: 1000,
});
```

you give it all the text style as input and it will give you back:

- text that has line breaks in it and it
- css styles with adjusted fontSize so that the text won't overflow the desired width and heigth (height is calculated with `fontSize * maxLines`)

so you can use that text like this:

```tsx
<p style={text.style}>{text.text}</p>
```

here `text.text` will have \n line breaks in it.
