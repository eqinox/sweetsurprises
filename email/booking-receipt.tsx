import { Reservation } from "@/types/reservation";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ReservationEmailProps = {
  reservation: Reservation;
};

ReservationConfirmationEmail.PreviewProps = {
  reservation: {
    id: "abc123",
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "0888123456",
    service: "Масаж",
    date: new Date(),
    time: "16:30",
    status: 1,
  },
} satisfies ReservationEmailProps;

const dateFormatter = new Intl.DateTimeFormat("bg-BG", {
  dateStyle: "long",
});

export default function ReservationConfirmationEmail({
  reservation,
}: ReservationEmailProps) {
  return (
    <Html>
      <Preview>Потвърждение за резервация</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading className="text-pink-600">
              Вашата резервация е направена
            </Heading>
            <Section className="mb-4">
              <Text className="text-base text-gray-800">
                Здравейте, {reservation.name}!
              </Text>
              <Text className="text-base text-gray-800">
                Благодарим Ви, че направихте резервация при нас. Ето
                подробностите:
              </Text>
            </Section>

            <Section className="border border-solid border-gray-300 rounded-lg p-4">
              <Row className="py-1">
                <Column>
                  <Text className="text-gray-500">Услуга:</Text>
                </Column>
                <Column align="right">
                  <Text>{reservation.service}</Text>
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  <Text className="text-gray-500">Дата:</Text>
                </Column>
                <Column align="right">
                  <Text>{dateFormatter.format(reservation.date)}</Text>
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  <Text className="text-gray-500">Час:</Text>
                </Column>
                <Column align="right">
                  <Text>{reservation.time}</Text>
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  <Text className="text-gray-500">Телефон:</Text>
                </Column>
                <Column align="right">
                  <Text>{reservation.phone}</Text>
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  <Text className="text-gray-500">Имейл:</Text>
                </Column>
                <Column align="right">
                  <Text>{reservation.email}</Text>
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  <Text className="text-gray-500">Номер на резервация:</Text>
                </Column>
                <Column align="right">
                  <Text>{reservation.id}</Text>
                </Column>
              </Row>
            </Section>

            <Section className="mt-4">
              <Text className="text-sm text-gray-600">
                Ако имате въпроси или желаете да промените резервацията си, моля
                свържете се с нас.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
