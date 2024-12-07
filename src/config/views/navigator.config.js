const navigatorOptions = (TransitionSpecs, CardStyleInterpolators) => ({
  headerShown: false,
  contentStyle: {
    backgroundColor: '#F5F9FF',
  },
  transitionSpec: {
    open: TransitionSpecs.ScaleFromCenterAndroidSpec, // Animación personalizada para abrir
    close: TransitionSpecs.FadeOutToBottomAndroidSpec, // Animación personalizada para cerrar
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Animación horizontal estilo iOS
})

export default navigatorOptions
