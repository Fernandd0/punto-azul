AOS.init();

MyApp = {
  marqueeHome: {
    init: function () {
      var anchoPantalla2 = window.innerWidth;
      if (anchoPantalla2 <= 500) {
        $(".contentMarquee .marquee").marquee({
          duration: 10000,
          gap: 0,
          delayBeforeStart: 0,
          direction: "rigth",
          duplicated: true,
        });
      } else {
        $(".contentMarquee .marquee").marquee({
          duration: 18000,
          gap: 0,
          delayBeforeStart: 0,
          direction: "rigth",
          duplicated: true,
        });
      }
    },
  },
  sliderHistoria: {
    init: function () {
      var swiper = new Swiper(".sliderHistoria", {
        slidesPerView: 4,
        spaceBetween: 30,
        //loop: true,
        navigation: {
          nextEl: ".historia .swiper-button-next",
          prevEl: ".historia .swiper-button-prev",
        },
        breakpoints: {
          1201: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          901: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          501: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        },
      });
    },
  },
  menuTipos: {
    init: function () {
      /* importar imagenes */
      var tiposComida = document.querySelectorAll(
        ".contentTiposComida .tipoComida"
      );
      var numTiposComida = tiposComida.length;
      var contenedorFiguras = document.querySelector(
        ".contentCarta .contentFiguras"
      );

      for (var i = 0; i < numTiposComida; i++) {
        var numFigura = (i % 3) + 1;
        var figuraSrc = "img/figura" + numFigura + ".svg";

        var img = document.createElement("img");
        img.src = figuraSrc;
        img.alt = "";
        img.classList.add("figura" + (i + 1));
        img.classList.add("figura");

        contenedorFiguras.appendChild(img);
      }

      /* poner la separacion de las imagenes */

      const figuras = document.querySelectorAll(".figura");
      const separation = 800; // Porcentaje de separación vertical
      const totalFiguras = figuras.length;

      for (let i = 0; i < totalFiguras; i++) {
        const figura = figuras[i];
        const topValue = i * separation;
        figura.style.top = `${topValue}px`;
      }

      $(".menuTipos").stick_in_parent({
        offset_top: 0,
        offset_right: 0,
      });

      $("section.contentCarta .contentImg").stick_in_parent({
        offset_top: 100,
        offset_left: 0,
      });

      var swiper = new Swiper(".sliderButtonCarta", {
        slidesPerView: "auto",
        spaceBetween: 45,
        navigation: {
          nextEl: ".sliderButtonCarta .swiper-button-next",
          prevEl: ".sliderButtonCarta .swiper-button-prev",
        },
      });

      const botones = document.querySelectorAll(".menuTipos a");
      botones.forEach((boton) => {
        boton.addEventListener("click", function () {
          //window.removeEventListener("scroll", actualizarEnlaceSeleccionado);
          var header = document.querySelector("header");
          var menuTipos = document.querySelector(".menuTipos");
          setTimeout(() => {
            header.classList.remove("leoCdG");
            header.classList.add("bVLcxx");
            menuTipos.classList.remove("menuopen");
          }, 500);
          botones.forEach((boton) => {
            boton.classList.remove("select1");
          });
          boton.classList.add("select1");
        });
      });
/*
      window.addEventListener("scroll", function() {
        // Vuelve a agregar el event listener del evento de desplazamiento cuando se realiza un desplazamiento después de hacer clic en el botón
        window.addEventListener("scroll", actualizarEnlaceSeleccionado);
        // Elimina este event listener para que solo se ejecute una vez después de hacer clic en el botón
        //window.removeEventListener("scroll", arguments.callee);
    });
    */

      const tabs = document.querySelectorAll(".tab .cabecera");
      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          if (tab.closest(".tab").classList.contains("open")) {
            tab.closest(".tab").classList.remove("open")
          }else{
            tabs.forEach((tab) => {
              tab.closest(".tab").classList.remove("open");
            });
            tab.closest(".tab").classList.add("open");
          }
        });
      });

      // Función para determinar qué sección está actualmente visible en la ventana
      function determinarSeccionVisible() {
        const secciones = document.querySelectorAll(".tipoComida");
        let seccionVisible = null;
        const viewportMitad = window.innerHeight / 3;

        secciones.forEach((seccion) => {
          const rect = seccion.getBoundingClientRect();

          if (rect.top <= viewportMitad) {
            seccionVisible = seccion.id;
          }
        });

        return seccionVisible;
      }

      // Función para actualizar el enlace seleccionado en el menú
      function actualizarEnlaceSeleccionado() {
        const seccionVisible = determinarSeccionVisible();

        if (seccionVisible) {
          const enlaces = document.querySelectorAll(".menuTipos a");
          enlaces.forEach((enlace) => {
            if (enlace.getAttribute("href").slice(1) === seccionVisible) {
              enlace.classList.add("select");
              var valorenlace = enlace.parentElement;
              var atributodelenlace = valorenlace.getAttribute("aria-label");
              const numero = /\d+/.exec(atributodelenlace)[0];
              swiper.slideTo(numero - 2, 500, false);
              /*
              if (document.querySelector(".swiper-initialized")) {
                if (enlace.classList.contains("select1")) {
                  window.removeEventListener("scroll", actualizarEnlaceSeleccionado);
                }else{
                  swiper.slideTo(numero - 2, 500, false);
                  window.addEventListener("scroll", actualizarEnlaceSeleccionado);
                }
              }
              */
              
            } else {
              enlace.classList.remove("select");
            }
          });
          // Actualizar imágenes
          const imagenes = document.querySelectorAll("img[data-plato]");
          imagenes.forEach((imagen) => {
            if (imagen.getAttribute("data-plato") === seccionVisible) {
              imagen.parentElement.classList.add("select");
            } else {
              imagen.parentElement.classList.remove("select");
            }
          });
        }
      }

      // Evento de desplazamiento para actualizar el enlace seleccionado
      window.addEventListener("scroll", actualizarEnlaceSeleccionado);

      var anchoPantalla2 = window.innerWidth;
      if (anchoPantalla2 <= 1565) {
        const targetNode = document.querySelector(
          "section.contentCarta .container .part1 .contentImg"
        );
        const observer = new MutationObserver((mutationsList, observer) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "style"
            ) {
              const styles = window.getComputedStyle(targetNode);
              if (styles.getPropertyValue("bottom") === "0px") {
                // Agrega padding-top: 101.2%
                targetNode.style.paddingTop = "101.2%";
              } else {
                targetNode.style.paddingTop = "39.8%";
              }
            }
          }
        });
        const config = { attributes: true };
        observer.observe(targetNode, config);
      }
    },
  },
  HomeMenuTipos: {
    init: function () {
      /* importar imagenes */
      var tiposComida = document.querySelectorAll("section.tipoPlatos .contentTipoPlatos .itemPlatos");
      var numTiposComida = tiposComida.length;
      var contenedorFiguras = document.querySelector("section.tipoPlatos .contentFiguras");

      for (var i = 0; i < numTiposComida; i++) {
        var numFigura = (i % 3) + 1;
        var figuraSrc = "img/figura" + numFigura + ".svg";

        var img = document.createElement("img");
        img.src = figuraSrc;
        img.alt = "";
        img.classList.add("figura" + (i + 1));
        img.classList.add("figura");

        contenedorFiguras.appendChild(img);
      }

      /* poner la separacion de las imagenes */

      const figuras = document.querySelectorAll(".figura");
      const separation = 1300; // Porcentaje de separación vertical
      const totalFiguras = figuras.length;

      for (let i = 0; i < totalFiguras-1; i++) {
        const figura = figuras[i+1];
        const topValue = i * separation;
        figura.style.top = `${topValue}px`;
      }
    }
  },
  header: {
    init: function () {
      window.addEventListener("DOMContentLoaded", function () {
        var header = document.querySelector("header");
        var headerClass = "hLTFFw";
        var prevScrollPos =
          window.pageYOffset || document.documentElement.scrollTop;

        function handleScroll() {
          var currentScrollPos =
            window.pageYOffset || document.documentElement.scrollTop;
          var isAtTop = currentScrollPos === 0;
          var isScrollingUp = prevScrollPos > currentScrollPos;
          var isScrollingDown = currentScrollPos > prevScrollPos + 3;

          if (isAtTop) {
            headerClass = "hLTFFw";
            var menuCarta = document.querySelector(
              "section.contentCarta .container .part2 .menuTipos"
            );
            if (menuCarta) {
              menuCarta.classList.remove("menuopen");
            }
          } else if (isScrollingUp) {
            headerClass = "leoCdG";
            var menuCarta = document.querySelector(
              "section.contentCarta .container .part2 .menuTipos"
            );
            if (menuCarta) {
              menuCarta.classList.add("menuopen");
            }
          } else if (isScrollingDown) {
            headerClass = "bVLcxx";
            var menuCarta = document.querySelector(
              "section.contentCarta .container .part2 .menuTipos"
            );
            if (menuCarta) {
              menuCarta.classList.remove("menuopen");
            }
          }

          header.className = headerClass;
          prevScrollPos = currentScrollPos;
        }

        window.addEventListener("scroll", handleScroll);
        /*
        setTimeout(() => {
          AOS.init();
        }, 700);
        */
      });
    },
  },
  menumovil: {
    init: function () {
      document.addEventListener("click", function (e) {
        if (e.target.closest("header .container .nav button")) {
          document.querySelector(".menumovil").classList.toggle("open");
          document
            .querySelector("header .container .nav button")
            .classList.toggle("open");
          document.querySelector("body").classList.toggle("scrollHidden");
        }
        if (e.target.closest("header .container .nav button img")) {
          document.querySelector("header").classList.add("mostrar");
          setTimeout(() => {
            document.querySelector("header").classList.add("mostrar");
          }, 200);
        }
        if (e.target.closest("header .container .nav button img.close")) {
          document.querySelector("header").classList.remove("mostrar");
          setTimeout(() => {
            document.querySelector("header").classList.remove("dasdasd");
          }, 200);
        }
      });
    },
  },
  tabFooter: {
    init: function () {
      const tabs = document.querySelectorAll(
        "footer .part1 div .acordeon .item .cabecera"
      );
      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {          
          if (tab.closest(".item").classList.contains("open")) {
            tab.closest(".item").classList.remove("open");
          }else{
            tabs.forEach((tab) => {
              tab.closest(".item").classList.remove("open");
            });
            tab.closest(".item").classList.add("open");
          }
        });
      });

      const tabs2 = document.querySelectorAll("footer .tab h4");
      tabs2.forEach((tab) => {
        tab.addEventListener("click", function () {
          if (tab.closest(".tab").classList.contains("open")) {
            tab.closest(".tab").classList.remove("open");
          }else{
            tabs2.forEach((tab) => {
              tab.closest(".tab").classList.remove("open");
            });
            tab.closest(".tab").classList.add("open");
          }
        });
      });
    },
  },
  swiperProductos: {
    init: function () {
      var swiper = new Swiper(".swiperProductos", {
        slidesPerView: 6,
        spaceBetween: 30,
        loop: true,
        Infinity: true,
        navigation: {
          nextEl: "section.productos .swiper-button-next",
          prevEl: "section.productos .swiper-button-prev",
        },
      });
    },
  },
  tabsLocales: {
    init: function () {
      const tabsContainers = document.querySelectorAll(".tabs");

      tabsContainers.forEach((tabsContainer) => {
        const firstTab = tabsContainer.querySelector(".tab");
        firstTab.classList.add("open");
        const images = tabsContainer
          .closest(".item")
          .querySelectorAll(".part1 img");
        images[0].classList.add("select");
        tabsContainer.querySelectorAll(".cabecera").forEach((cabecera) => {
          cabecera.addEventListener("click", function () {
            const tabs = tabsContainer.querySelectorAll(".tab");
            tabs.forEach((tab) => {
              tab.classList.remove("open");
            });
            images.forEach((image) => {
              image.classList.remove("select");
            });
            this.parentElement.classList.add("open");
            const selectedIndex = Array.from(tabs).indexOf(this.parentElement);
            images[selectedIndex].classList.add("select");
          });
        });
      });
    },
  },
  lineas: {
    init: function () {
      var content = document.querySelector("section.hero2 .content");
      var imgElement = document.querySelector("section.hero2 .figura");

      var anchoPantalla2 = window.innerWidth;
      if (anchoPantalla2 <= 900) {
        var sticky3 = gsap.timeline({
          scrollTrigger: {
            //markers: true,
            trigger: content,
            start: "-100px 0%",
            end: "60% 20%",
            scrub: true,
          },
        });
        sticky3.to(imgElement, { height: "100%" });
      } else {
        var sticky4 = gsap.timeline({
          scrollTrigger: {
            //markers: true,
            trigger: content,
            start: "-10% 0%",
            end: "90% 50%",
            scrub: true,
          },
        });
        sticky4.to(imgElement, { height: "100%" });
      }
    },
  },
  lineasFooter: {
    init: function () {
      var contentfooter = document.querySelector("footer");
      var lineaElement = document.querySelector("footer .linea");
      var logofooter = document.querySelector("footer .logo a");

      var anchoPantalla = window.innerWidth;
      if (anchoPantalla <= 1000) {
        var sticky = gsap.timeline({
          scrollTrigger: {
            //markers: true,
            trigger: contentfooter,
            start: "0% 80%",
            end: "50% 100%",
            scrub: true,
          },
        });
        sticky.to(lineaElement, { height: "140px" });

        var sticky2 = gsap.timeline({
          scrollTrigger: {
            //markers: true,
            trigger: contentfooter,
            start: "50% 100%",
            end: "50% 100%",
            scrub: true,
          },
        });
        sticky2.to(logofooter, { opacity: "1" });
      } else {
        var sticky = gsap.timeline({
          scrollTrigger: {
            //markers: true,
            trigger: contentfooter,
            start: "0% 80%",
            end: "100% 100%",
            scrub: true,
          },
        });
        sticky.to(lineaElement, { height: "270px" });

        var sticky2 = gsap.timeline({
          scrollTrigger: {
            //markers: true,
            trigger: contentfooter,
            start: "100% 100%",
            end: "100% 100%",
            scrub: true,
          },
        });
        sticky2.to(logofooter, { opacity: "1" });
      }
    },
  },
  animationEntrada: {
    init: function () {
      var contentTitle = document.querySelector(
        ".eleccionIdioma .contentTitle"
      );
      var contentTitleh2 = document.querySelector(
        ".eleccionIdioma .contentTitle h2"
      );
      setTimeout(() => {
        contentTitle.classList.add("mostrar");
        contentTitleh2.classList.add("mostrar");
      }, 1000);
    },
  },
  validate: {
    init: function () {
      const listainputs = document.querySelectorAll('.formulario form fieldset input:not([type="file"])');

      const listatestarea = document.querySelectorAll(".formulario form fieldset textarea");
      const inputNumero = document.querySelector(".formulario form fieldset #numero");
      const inputselect = document.querySelectorAll(".formulario form fieldset select");
      var inputCorreo = document.querySelector(".formulario form fieldset input[type=email]");
      const radios2 = document.querySelectorAll('input[name="tipo"]');
      var fechaInput = document.getElementById('fecha');
      
      if (fechaInput) {
        var fechaActual = new Date();
        var dia = fechaActual.getDate();
        var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
        var anio = fechaActual.getFullYear();
        
        // Formatear el día y mes para que siempre tengan dos dígitos
        dia = (dia < 10) ? '0' + dia : dia;
        mes = (mes < 10) ? '0' + mes : mes;
        
        // Establecer el valor del input con la fecha actual en formato dd/mm/yyyy
        fechaInput.value = dia + '/' + mes + '/' + anio;
    }

      function validateradios(e){
        if (radios2) {
          let atLeastOneChecked = false;

            radios2.forEach(radio => {
                if (radio.checked) {
                    atLeastOneChecked = true;
                }
            });

            if (!atLeastOneChecked) {
                radios2.forEach(radio => {
                    radio.parentNode.classList.add('error');
                    e.preventDefault();
                });
            } else {
                radios2.forEach(radio => {
                    radio.parentNode.classList.remove('error');
                });
            }
        }
      }

      function valiteInputs(e) {
        for (let y = 0; y < listainputs.length; y++) {
            if (!listainputs[y].value) {
                listainputs[y].classList.add("error");
                e.preventDefault();
            } else {
                listainputs[y].classList.remove("error");
            }
        }
      }

      function validatetarea(e) {
        for (let y = 0; y < listatestarea.length; y++) {
            if (!listatestarea[y].value) {
              listatestarea[y].classList.add("error");
                e.preventDefault();
            } else {
              listatestarea[y].classList.remove("error");
            }
        }
      }

      function validateNumbreTelefono(e) {
        const minimoCaracteres = 8;
        if (inputNumero) {
          if (inputNumero.value.length <= minimoCaracteres) {
              inputNumero.classList.add("error");
              e.preventDefault();
          } else {
              inputNumero.classList.remove("error");
          }          
        }
      }

      function validateInputCorreo(e) {
        var valueCorreo = inputCorreo.value;
        if (valueCorreo.includes("@") && (valueCorreo.includes(".com") || valueCorreo.includes(".pe") || valueCorreo.includes(".gob") || valueCorreo.includes(".net") || valueCorreo.includes(".org") || valueCorreo.includes(".edu") || valueCorreo.includes(".gov") || valueCorreo.includes(".mil"))) {
            inputCorreo.classList.remove("error");
        } else {
            inputCorreo.classList.add("error");
            e.preventDefault();
        }
      }

      function validateInputTerminos(e) {
        var inputTerminos = document.querySelector(".formulario form fieldset input[type='checkbox']");
        if (inputTerminos) {
          if (inputTerminos.checked) {
              inputTerminos.closest(".checkbox").classList.remove("error");
          } else {
              inputTerminos.closest(".checkbox").classList.add("error");
              e.preventDefault();
          }          
        } 
      }

      function validarinputselect(e) {
        if (inputselect) {
            for (let i = 0; i < inputselect.length; i++) {
                const selectedOptionIndex = inputselect[i].selectedIndex;
                if (selectedOptionIndex === 0) {
                    inputselect[i].classList.add("error");
                    e.preventDefault();
                } else {
                    inputselect[i].classList.remove("error");
                }
            }
        }
    }


      document.addEventListener("click", function (e) {
        if (e.target.closest(".formulario form fieldset button")) {
            valiteInputs(e)
            validateNumbreTelefono(e)
            validateInputCorreo(e)
            validateInputTerminos(e)
            validatetarea(e)
            validateradios(e)
            validarinputselect(e)
        }
      })

      /*validador de texto*/
			
			const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='number'], textarea");
			const inputNombre = document.querySelectorAll("input[name='your-name']");

      inputs.forEach(input => {
				input.addEventListener("input", function(event) {
					const value = event.target.value;
					let sanitizedValue = value;
					if (event.target.type === 'text' || event.target.type === 'email') {
	        			sanitizedValue = value.replace(/[<>;&#%$"'\[\]{}=?!/()¿,º¡]/g, '');
	      			}
					if (event.target.type === 'number') {
	        			input.addEventListener("keydown", function(event) {
	        				if (event.key === 'e' || event.key === '-') {
    	      					event.preventDefault();
	        				}
	      				});
	      			}
					if (event.target.tagName === 'TEXTAREA') {
						sanitizedValue = value.replace(/[<>;&#%$"'\[\]{}=!]/g, '');
					}
					if (value !== sanitizedValue) {
        				event.target.value = sanitizedValue;
      				}
				})
			});

      inputNombre.forEach(inputNombre => {
				inputNombre.addEventListener('keydown', (event) => {
  					const regex = new RegExp(/^[a-zA-Záéíó úñ]+$/);
  					const key = event.key;
  					if (!regex.test(key)) {
	    				event.preventDefault();
	  				}
				});
			})

    },
  },
  archivo: {
      init: function () {
          const inputArchivo = document.querySelector('input[type=file]');
          inputArchivo.addEventListener('change', function () {
              const nombreArchivo = inputArchivo.files[0].name;
              const spanNombreArchivo = document.querySelector('.nombreArchivo');
              spanNombreArchivo.classList.add("mostrar");
              spanNombreArchivo.textContent = nombreArchivo;
          });
      }
  }
};

if ($(".nombreArchivo").length > 0) {
  MyApp.archivo.init();
}

if ($("section.tipoPlatos .contentTipoPlatos .itemPlatos").length > 0) {
  MyApp.HomeMenuTipos.init();
}

if ($(".formulario form").length > 0) {
  MyApp.validate.init();
}

if ($(".contentMarquee .marquee").length > 0) {
  MyApp.marqueeHome.init();
}

if ($(".sliderHistoria").length > 0) {
  MyApp.sliderHistoria.init();
}

if ($(".menuTipos").length > 0) {
  MyApp.menuTipos.init();
}

if ($("header").length > 0) {
  MyApp.header.init();
}

if ($(".menumovil").length > 0) {
  MyApp.menumovil.init();
}

if ($("footer .part1 div .acordeon").length > 0) {
  MyApp.tabFooter.init();
}

if ($(".swiperProductos").length > 0) {
  MyApp.swiperProductos.init();
}

if ($("section.locales .tabs").length > 0) {
  MyApp.tabsLocales.init();
}
if ($("section.hero2 .figura").length > 0) {
  MyApp.lineas.init();
}

if ($("footer .linea").length > 0) {
  MyApp.lineasFooter.init();
}

if ($(".eleccionIdioma").length > 0) {
  MyApp.animationEntrada.init();
}
