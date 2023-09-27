import {MemoryRouter, Route, Routes, useLocation, useParams} from 'react-router';
import {BrowserRouter, Link} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Home = () => <h1>Home page</h1>
const About = () => <h1>About page</h1>
const Error = () => <h1>404: Error</h1>

const Contact = () => {
    const {name} = useParams()
    return <h1 data-testid="contact-name">{name}</h1>
}
const LocationDisplay = () => {
    const location = useLocation()
    return <div data-testid="location-display">{location.pathname}</div>
}

const name = 'Alex'

const ReactRouter = () => {
    return (
        <>
            <nav data-testid="navbar">
                <Link to="/" data-testid="home-link">Home</Link>
                <Link to="/about" data-testid="about-link">About</Link>
                <Link to={`/contact/${name}`} data-testid="name-link">Contact</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact/:name" element={<Contact/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
            <LocationDisplay/>
        </>
    )
}

const renderWithRouter = (component, {route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
        ...render(component, {wrapper: BrowserRouter}),
    }
}

describe('Router', () => {
    it('should render home page', async () => {
        // render(<ReactRouter/>, {wrapper: BrowserRouter})
        renderWithRouter(<ReactRouter/>)
        const navbar = screen.getByTestId('navbar')
        const link = screen.getByTestId('home-link')
        expect(navbar).toBeInTheDocument()
        expect(navbar).toContainElement(link)
    });
    it('should navigate to about page', async () => {
        render(<ReactRouter/>, {wrapper: BrowserRouter})
        expect(screen.getByText(/home page/i)).toBeInTheDocument()
        await userEvent.click(screen.getByTestId('about-link'))
        expect(screen.getByText(/about page/i)).toBeInTheDocument()
    });
    it('should navigate to contact page', async () => {
        render(<ReactRouter/>, {wrapper: BrowserRouter})
        await userEvent.click(screen.getByTestId('home-link'))
        expect(screen.getByText(/home page/i)).toBeInTheDocument()
        await userEvent.click(screen.getByTestId('name-link'))
        expect(screen.getByTestId('contact-name')).toHaveTextContent(/alex/i)
    });
    it('landing on a bad page', () => {
        const badRoute = '/some/bad/route'

        // render(
        //     <MemoryRouter initialEntries={[badRoute]}>
        //         <ReactRouter/>
        //     </MemoryRouter>,
        // )

        renderWithRouter(<ReactRouter/>, {route: badRoute})

        expect(screen.getByText(/error/i)).toBeInTheDocument()
        expect(screen.getByTestId('location-display')).toHaveTextContent(badRoute)

    })
})