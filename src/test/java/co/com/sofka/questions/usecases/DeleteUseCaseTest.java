package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.Arrays;


@SpringBootTest
class DeleteUseCaseTest {

    @MockBean
    private AnswerRepository answerRepository;
    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    DeleteUseCase deleteQuestionUseCase;

    @Test
    @DisplayName("Deleted by Id")
    void delete(){

        var questionDTO = new QuestionDTO("122","xxx","Is this running?","Tests",
                "Technology",1,2, Arrays.asList("user1", "user2"),  "test@test.com");

        var answerDTO = new AnswerDTO("XXX","122","xxx","test");

        Mockito.when(questionRepository.deleteById("122")).thenReturn(Mono.empty());
        Mockito.when(answerRepository.deleteByQuestionId("122")).thenReturn(Mono.empty());

        var result = deleteQuestionUseCase.apply("122").block();

        Assertions.assertNull(result);
    }

}