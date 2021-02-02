import { Component, State, Event, EventEmitter, Watch, Build, h } from '@stencil/core';
import { LocationSegments, RouterHistory } from '@stencil/router';
import { AssetsService } from "@sparkle-learning/core";
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  history: RouterHistory | null = null;
  private tocPath: string = "/assets/content/toc.json";
  private quizPath: string = "/assets/quiz.json";

  @State() isMenuToggled = false;
  @State() tocData: any;
  @State() config = {
    prod: false,
    appUrl: 'http://localhost:3333',
    globalAssetsUrl: 'http://localhost:3333/assets',
    apiUrl: 'http://localhost:3333',
    quizPath: this.quizPath,
    tocPath: this.tocPath,
    menu: {
      showRomanNumber: true,
      showModuleIndex: true,
      showSessionIndex: true
    }
  }
  //ICourse;

  setHistory = ({ history }: { history: RouterHistory }) => {
    if (!this.history) {
      this.history = history;
      this.history.listen(this.newPage.bind(this));
    }
  };

  @Event() pageChanged!: EventEmitter;
  newPage(location: LocationSegments) {
    this.pageChanged.emit(location);
  }

  @Watch('isMenuToggled')
  lockScroll(isMenuToggled: boolean) {
    if (Build.isBrowser && this.isSmallViewport()) {
      document.body.classList.toggle('scroll-lock', isMenuToggled);
    }
  }

  async componentWillLoad() {
    this.tocData = await AssetsService.getInstance().loadJsonFile<any>(this.tocPath);
  }

  toggleMenu = () => {
    this.isMenuToggled = !this.isMenuToggled;
  };

  handlePageClick = () => {
    if (this.isSmallViewport() && this.isMenuToggled) {
      this.isMenuToggled = false;
    }
  };

  isSmallViewport() {
    return matchMedia && matchMedia('(max-width: 768px)').matches;
  }
  async toggleStudentSidebar() {
    var sidebar = document.getElementById("onlineStudents") as HTMLSparkleSidebarElement;
    await sidebar.show();
  }

  renderPage(path: "login" | "signup" | "forgot-password" | "home/my-mood" | "home/my-health" | "home/my-goals" | "home/great-white-wall") {
    return (
      <stencil-route
        url={"/" + path}
        routeRender={props => [
          <sparkle-header toggleClickFn={this.toggleMenu} />,
          <sparkle-menu toc={this.tocData} config={this.config.menu} toggleClickFn={this.toggleMenu} />,
          <sparkle-page>
            {path == "login" && <sparkle-login />}
            {path == "signup" && <sparkle-signup />}
            {path == "forgot-password" && <sparkle-forgot-password />}
            {path == "home/my-mood" && <sparkle-mood />}
            {path == "home/my-health" && <sparkle-health />}
            {path == "home/my-goals" && <sparkle-goals />}
            {path == "home/great-white-wall" && <sparkle-gww />}
          </sparkle-page>
        ]}
      />

    )
  }
  render() {
    const layout = {
      'Layout': true,
      'is-menu-toggled': this.isMenuToggled,
    };

    return (
      <sparkle-root config={this.config}>
        <stencil-router class={layout}>
          <stencil-route style={{ display: 'none' }} routeRender={this.setHistory} />
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route
              url="/course/:page*"
              routeRender={props =>
                [<sparkle-header toggleClickFn={this.toggleMenu} />,
                <sparkle-menu toc={this.tocData} config={this.config.menu} toggleClickFn={this.toggleMenu} />,
                <sparkle-page path={`/course/${props.match.params.page || 'index'}.json`} onClick={this.handlePageClick}
                />]}
            />
            <stencil-route
              url="/presentation/course/:page*"
              routeRender={props => <sparkle-page presentation={true} path={`/course/${props.match.params.page || 'index'}.json`} onClick={this.handlePageClick} />}
            />
            <stencil-route
              url="/presentation/teacher/:page*"
              routeRender={props => [
                <sparkle-facilitator-header toggleStudentClickFn={this.toggleStudentSidebar} toggleClickFn={this.toggleMenu} />,

                <sparkle-facilitator-page path={`/course/${props.match.params.page || 'index'}-notes.json`} onClick={this.handlePageClick} />,
                <sparkle-sidebar position="right" header-text="Online Students" id="onlineStudents">
                  <ion-button color="primary">Primary</ion-button>,
                  <sparkle-online-students />
                </sparkle-sidebar>
              ]}
            />
            {this.renderPage("home/my-mood")}
            {this.renderPage("home/my-health")}
            {this.renderPage("home/my-goals")}
            {this.renderPage("home/great-white-wall")}
            <stencil-route
              url="/home/:page*"
              routeRender={props =>
                [<sparkle-header toggleClickFn={this.toggleMenu} />,
                <sparkle-menu toc={this.tocData} config={this.config.menu} toggleClickFn={this.toggleMenu} />,
                <sparkle-page path={`/course/home/${props.match.params.page || 'index'}.json`} onClick={this.handlePageClick} />]}
            />
            {this.renderPage("login")}
            {this.renderPage("signup")}
            {this.renderPage("forgot-password")}
          </stencil-route-switch>
        </stencil-router>
      </sparkle-root>
    );
  }
}